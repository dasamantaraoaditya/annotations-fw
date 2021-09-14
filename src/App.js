import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/login/login'
import Registration from "./components/registration/registration";
import Images from "./components/images/images";
import MyAnnotates from "./components/myAnnotates/myAnnotates";
import Annotate from "./components/annotate/annotate";
import CheckAnnotate from "./components/checkAnnotate/checkAnnotate";
import {Component, useState} from "react";


class App extends Component {

    constructor() {
        super();
        this.state = {
            currentUser: {}
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Registration}/>
                    <Route exact path='/login'
                           render={props => <Login {...props}
                                                   setLoggedInUser={user => this.setState({currentUser: user})}/>}/>
                    <Route exact path='/upload'
                           render={(props) => <Images currentUser={this.state.currentUser} {...props} />}/>
                    <Route exact path='/myannotates'
                           render={(props) => <MyAnnotates currentUser={this.state.currentUser} {...props}/>}/>
                    <Route path='/annotate'
                           render={(props) => <Annotate currentUser={this.state.currentUser} {...props} />}/>
                    <Route path='/checkannotate'
                           render={(props) => <CheckAnnotate currentUser={this.state.currentUser} {...props}/>}/>
                </div>
            </Router>
        );
    }
}

export default App;
