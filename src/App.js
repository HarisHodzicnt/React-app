import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './login/Login';
import Home from './home/Home';
import Header from './header/header';
import Footer from './footer/Footer';
import AdminHome from './home/AdminHome';
import UserDetails from './user/UserDetails';
import NoMatch from './NoMatch';
import './App.css';


function App() {
  const pathname = window.location.href;
  const id=sessionStorage.getItem("id");
  const rola=sessionStorage.getItem("rola");

  return (
      <Router>
        <Route component={Header} />
          <Switch>
            {
              (id==null || rola==null) ? <Route component={Login} /> : false
            }
             {
               (id!=null && rola=='Korisnik') ? 
               <Switch>
               <Route exact path="/" component={Login} />
               <Route path="/home" component={Home} /> 
               <Route component={NoMatch} />
               </Switch> : false

             }
             {
               (id!=null && rola=='Admin') ? 
               <Switch>
               <Route exact path="/" component={Login} />
               <Route path="/homeAdmin" component={AdminHome} />
               <Route path="/userDetails/:id" component={UserDetails} />
               <Route component={NoMatch} />
               </Switch> : false

             }
             
             
        </Switch>
        {
          pathname == "http://localhost:3000/" ? false:<Route component={Footer} />
        }
    </Router>
  );
}

export default App;
