import React from 'react'
import './App.css'
import Home from './components/home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './components/auth/Auth';
// import './Feed.css'
const App = () => {

    return (

        <div className='app'>
            <BrowserRouter >
                <Switch >
                    <Route path='/' exact component={Home} />
                    <Route path='/auth' exact component={Auth} />
                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
