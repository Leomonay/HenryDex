import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Pokemon from './components/Pokemon';
import Pokedex from './components/Pokedex';
import Landing from './components/Landing';
import AddNew from './components/AddNew';


import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Landing} hideNavBar={true}/>
          <div>
            <NavBar className='nav' />
            <Route exact path="/home" component={Pokedex} />
            <Route path='/addNew' component={AddNew}/>
            <Route path="/pokemon/:name" component={Pokemon} />
          </div>
        </Switch>
      </React.Fragment>
    </div>
  );
}

export default App;
