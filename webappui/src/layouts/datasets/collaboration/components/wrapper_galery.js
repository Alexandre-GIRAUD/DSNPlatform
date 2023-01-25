import React from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Gallery from "./gallery";


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Wrapper_Galery extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list_img_names: [],
        };
    }

    componentDidMount() {
        if (Object.values(this.state)[0].length === 0) {
            console.log(this.props.datasetname);
            const response = axios.get(`http://127.0.0.1:5001/v2/getNonLabelizedImages/${this.props.datasetname}`).then(result => {
                console.log(result);
                var tmp_array = result.data.replace("[", "").replace("]", "").split(", ");
                var parsed_array = [];
                tmp_array.forEach(element => {
                    parsed_array.push(element.replace("'", "").replace("'", ""))
                });
                this.setState({
                    list_img_names: parsed_array,
                });

            });
        }
        else {
        }
    }

    render() {
        console.log(this.state.list_img_names);
        return (<>
            {this.state.list_img_names.length > 0 ? <Gallery datasetname={this.props.datasetname} list_images={this.state.list_img_names} /> : null}
        </>
        );
    }
}


export default Wrapper_Galery;