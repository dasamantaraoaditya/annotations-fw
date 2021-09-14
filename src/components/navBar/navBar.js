import React from "react";
import "./navBar.css";
import {Link} from "react-router-dom";

class NavBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="navbar">
                <a>SmartCow</a>
                <div className="dropdown">
                    <button className="dropbtn">Dropdown
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <p>Hi {this.props.currentUser ? this.props.currentUser['username'] : "UNKNOWN"}</p>
                        <a><Link to='/upload'>Images</Link></a>
                        <a><Link to='/myannotates'>Annotate</Link></a>
                        <a><Link to='/login'>Logout</Link></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;