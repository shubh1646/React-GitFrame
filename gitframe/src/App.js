import React from 'react';

import './App.css';
import Search from './components/Search'
import UserCard from './components/userCard'
import RepoCard from './components/RepoCard';
class App extends React.Component {

  state = {
    user: null,
    repos: [],
    userdataError: null,
    reposError: null,
    loading: false
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
    const res = await fetch(`https://api.github.com/users/${username}/repos?page=1`);

    if (res.ok) {

      const data = await res.json();
      return { data };
    }

    const error = (await res.json()).message;
    return { error };

  }




  fetchData = async username => {
    this.setState({ loading: true }, async () => {
      try {
        const [ user, repos ] = await Promise.all(
          [
            this.fetchUserData(username),
            this.fetchRepos(username),

          ]);
   
        if (user.data !== undefined && repos.data !== undefined) {
          
          return this.setState({
            user: user.data,
            repos: repos.data,
            loading: false,
            userdataError : null,
            reposError: null

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


  render() {
    const { userdataError, reposError, loading, user, repos } = this.state;
   console.log(repos)
    return (
      <div>
        <Search fetchData={this.fetchData} />
        {loading && <p>Loading .....</p>}
        {userdataError && <p className="text-danger">{userdataError}</p>}
        {!loading && !userdataError && user && <UserCard user={user} />}
        {reposError && <p className="text-danger">{reposError}</p>}
          {!loading && !reposError && repos.map(repo=> <RepoCard key={repo.id}  repo={repo}/>)}
      
      
      </div>
    );
  }

}

export default App;
