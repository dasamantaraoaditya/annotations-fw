import React from "react";
import NavBar from "../navBar/navBar";
import {Link} from "react-router-dom";

class MyAnnotates extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userImages: []
        }
    }

    componentWillReceiveProps = props => {
        if (props.currentUser.username)
            this.getMyAnnotatedImages(props.currentUser)
    }

    componentDidMount() {
        if (this.props.currentUser.username)
            this.getMyAnnotatedImages(this.props.currentUser)
    }

    getMyAnnotatedImages(currentUser) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        }
        fetch('/myannotates', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userImages: data
                });
            })
    }

    render() {
        return (
            <div>
                <NavBar currentUser={this.props.currentUser}/>
                <h1>My Annotated</h1>
                <div>
                    {this.state.userImages.map((image, i) => {
                        return <Link to={'/checkannotate/'+image['id']}><img
                            style={{padding: '35px'}}
                            src={'http://localhost:3000/image/' + this.props.currentUser.project + '/' + image['image_name']}
                            alt="Failed to load image" height={300}
                            width={300}/></Link>;
                    })}
                </div>
            </div>
        );
    }
}

export default MyAnnotates;