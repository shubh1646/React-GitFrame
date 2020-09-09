import React from 'react';

import './App.css';
import Search from './components/Search'
import UserCard from './components/userCard'
import RepoCard from './components/RepoCard';


//Total repos shared per page
const PAGE_SIZE =10;

class App extends React.Component {

  state = {
    user: null,
    repos: [],
    userdataError: null,
    reposError: null,
    loading: false,
    page: 1,
  };



  fetchUserData = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    if (res.ok) {

      const data = await res.json();
      return { data };
    }

    const error = (await res.json()).message;
    return { error };

  }


  fetchRepos = async (username) => {
    const {page} = this.state;
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${PAGE_SIZE}`);

    if (res.ok) {

      const data = await res.json();
      return { data , page : page+1};
    }

    const error = (await res.json()).message;
    return { error };

  }




  fetchData = async username => {
    this.setState({ loading: true }, async () => {
      try {
        const [user, repos] = await Promise.all(
          [
            this.fetchUserData(username),
            this.fetchRepos(username),

          ]);

        if (user.data !== undefined && repos.data !== undefined) {

          return this.setState({
            user: user.data,
            repos: repos.data,
            loading: false,
            userdataError: null,
            reposError: null,
            page: repos.page

          });
        }
        this.setState({
          userdataError: user.error,
          reposError: repos.error,
          loading: false
        });
      }
      catch (err) {
        this.setState({
          error: "There was some error",
          loading: false
        });
      }



    });



    //fetch github api

  };


  /// we using function here because there cabn be inconsistancy in upation of repos 

  loadMore =  async ()=>{
    const {repos}  = this.state;
    const {data,page } = await this.fetchRepos(this.state.user.login);
  if(data) 
  this.setState(state =>({
    page,
    repos : [... repos , ... data]
  }));
  
  
  };

  render() {
    const { userdataError, reposError, loading, user, repos, page } = this.state;
    //we decide should be show loader button or not
   // const hasNextPage = page*PAGE_SIZE >= user.public_repos;



    return (
      <div>
        <Search fetchData={this.fetchData} />
        {loading && <p>Loading .....</p>}
        {userdataError && <p className="text-danger">{userdataError}</p>}
        {!loading && !userdataError && user && <UserCard user={user} />}
        {reposError && <p className="text-danger">{reposError}</p>}
        {!loading && !reposError && repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          
      {!loading && !userdataError && user&&(page -10)*PAGE_SIZE<user.public_repos &&(
         < button className="btn btn-success" onClick={this.loadMore}>Load More
         </button>
      ) }
      </div>
    );
  }

}

export default App;
