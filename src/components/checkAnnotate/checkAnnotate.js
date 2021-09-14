import React from "react";
import NavBar from "../navBar/navBar";
import Annotation from 'react-image-annotation'
import {CSVLink} from "react-csv";

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

const headers = [
  { label: "Image", key: "image" },
  { label: "X", key: "x" },
  { label: "Y", key: "y" },
  { label: "W", key: "w" },
  { label: "H", key: "h" }
];

class CheckAnnotate extends React.Component {

    constructor() {
        super();
        this.state = {
            image: {},
            annotations: [],
            annotation: {},
            csvData: []
        };
        this.csvLinkEl = React.createRef();
    }

    getCurrentImageDetails() {
        let requestOptions = {
            method: 'GET'
        }
        let image_id = window.location.href.split('/').at(-1);
        fetch('/annotate/' + image_id, requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    "image": data
                });
            })
    }

    getImageAnnotations() {
        let requestOptions = {
            method: 'GET'
        }
        let image_id = window.location.href.split('/').at(-1);
        fetch('/checkannotate/' + image_id, requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    "annotations": data
                });
            })
    }

    componentDidMount() {
        this.getCurrentImageDetails();
        this.getImageAnnotations();
    }

    downloadCSV() {

        let requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                ...this.props.currentUser, 'image_name': this.state.image?.image_name
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        let image_id = window.location.href.split('/').at(-1);
        fetch('/download/' + image_id, requestOptions)
            .then(res => res.json())
            .then(data => {
                this.setState({csvData: data}, () => {
                    setTimeout(() => {
                        this.csvLinkEl.current.link.click();
                    });
                });

                console.log("Downloaded")
            })
    }

    render() {
        const {csvData} = this.state;
        return (
            <div>
                <NavBar currentUser={this.props.currentUser}/>
                <h1>Check Annotated or Download CSV</h1><br/>
                <div>
                    <Annotation
                        src={'http://localhost:3000/image/' + this.props.currentUser?.project + '/' + this.state.image?.image_name}
                        alt='Failed to load image!'

                        annotations={this.state.annotations}
                        renderHighlight={renderHighlight}
                        value={this.state.annotation}
                    />
                </div>
                <input type='button' value='Download CSV' onClick={this.downloadCSV.bind(this)}/>
                <CSVLink
                    headers={headers}
                    filename="smartCow.csv"
                    data={csvData}
                    ref={this.csvLinkEl}
                />
            </div>
        );
    }
}

export default CheckAnnotate;