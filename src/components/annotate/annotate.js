import React from "react";
import NavBar from "../navBar/navBar";
import Annotation from 'react-image-annotation'

let selectedVehicle = "";

function renderEditor(props) {
    const {geometry} = props.annotation
    if (!geometry) return null

    return (
        <div
            style={{
                background: 'white',
                borderRadius: 3,
                position: 'absolute',
                left: `${geometry.x}%`,
                top: `${geometry.y + geometry.height}%`,
            }}
        >
            <select id="vehicles" name="vehicles" value=""
                    onChange={e => {
                        let newAnnotation = {
                            ...props.annotation,
                            data: {
                                ...props.annotation.data,
                                text: e.target.value
                            }
                        }
                        selectedVehicle = {
                            ...props.annotation.data,
                            text: e.target.value
                        };
                        props.onChange(newAnnotation);
                        props.onSubmit();
                    }
                    }>
                <option value="">Select a vehicle</option>
                <option value="car">car</option>
                <option value="bus">bus</option>
                <option value="autorickshaw">autorickshaw</option>
                <option value="bike">bike</option>
            </select>
        </div>
    )
}

function renderHighlight({annotation, active}) {
    const {geometry} = annotation
    if (!geometry) return null

    return (
        <div
            style={{
                border: 'solid 1px black',
                background: 'rgba(167,134,167,0.2)',
                borderRadius: 3,
                position: 'absolute',
                left: `${geometry.x}%`,
                top: `${geometry.y}%`,
                width: `${geometry.width}%`,
                height: `${geometry.height}%`
            }}
        >
            {annotation.data.text}
        </div>
    )
}

class Annotate extends React.Component {

    constructor() {
        super();
        this.state = {
            image: {},
            annotations: [],
            annotation: {}
        };
    }

    getCurrentImageDetails() {
        let requestOptions = {
            method: 'GET'
        }
        fetch(window.location.href, requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    "image": data
                });
            })
    }

    componentDidMount() {
        this.getCurrentImageDetails();
    }

    //annotation events
    onChange = (annotation) => {
        this.setState({annotation: annotation})
    }

    onSubmit = (annotation) => {
        let {geometry, data} = annotation
        data = data ? data : selectedVehicle;
        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    saveAnnotations(){
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.annotations)
        }
        fetch(window.location.href, requestOptions)
            .then(res => {
                if(res.status == 200){
                    const {history} = this.props;
                    if (history) history.push('/myannotates');
                }
            })
    }

    render() {
        return (
            <div>
                <NavBar currentUser={this.props.currentUser}/>
                <h1>Annotate</h1><input type='button' value='Reset'/>
                <div>
                    <Annotation
                        src={'http://localhost:3000/image/' + this.props.currentUser?.project + '/' + this.state.image?.image_name}
                        alt='Failed to load image!'
                        annotations={this.state.annotations}
                        value={this.state.annotation}
                        onChange={this.onChange}
                        renderEditor={renderEditor}
                        onSubmit={this.onSubmit}
                        renderHighlight={renderHighlight}
                    />
                </div>
                <input type='button' value='Confirm' onClick={this.saveAnnotations.bind(this)}/>
            </div>
        );
    }
}

export default Annotate