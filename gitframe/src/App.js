import React from 'react';

import './App.css';
import Search from './components/Search'

class App extends React.Component {

  state={
    user: null
  };
fetchUserData=username=>{
  //fetch github api

};


  render(){
    return (
      <Search/>
      );
  }
  
}

export default App;
