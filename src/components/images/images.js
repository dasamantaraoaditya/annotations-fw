import React from "react";
import NavBar from "../navBar/navBar";
import {Link} from "react-router-dom";

class Images extends React.Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            imgCollection: '',
            userImages: [],
            loading: true
        }
    }

    getImages(userDetails) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }
        this.setState({
                    loading: true
                });
        fetch('/images', requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    userImages: data,
                    loading: false
                });
            })
    }

    componentWillReceiveProps = props => {
        if (props.currentUser.username)
            this.getImages(props.currentUser)
    }

    componentDidMount() {
        if (this.props.currentUser.username)
            this.getImages(this.props.currentUser)
    }

    onFileChange(e) {
        this.setState({imgCollection: e.target.files})
    }

    onSubmit(e) {
        e.preventDefault()

        let formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        for (const key of Object.keys(this.props.currentUser)) {
            formData.append(key, this.props.currentUser[key]);
        }

        let requestOptions = {
            method: 'POST',
            body: formData
        }

        fetch("/upload", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log("uploaded")
                    this.getImages(this.props.currentUser)
                }
            });
    }

    render() {
        return (
            <div>
                <NavBar currentUser={this.props.currentUser}/>
                <h1>Images</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="file" name="imgCollection" onChange={this.onFileChange} multiple/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Click here to upload images!</button>
                    </div>
                </form>
                <div>
                    {this.state.userImages.map((image, i) => {
                        return <Link to={'/annotate/' + image['id']}><img
                            style={{padding: '35px'}}
                            src={'http://localhost:3000/image/' + this.props.currentUser.project + '/' + image['image_name']}
                            alt="Failed to load image" height={300}
                            width={300}/></Link>;
                    })}
                    <label>{this.state.loading ? "Images are loading ... (or you are logged out)" : ""}</label>
                </div>
            </div>
        );
    }
}

export default Images;