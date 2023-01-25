import React from "react";
import { Form } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import axios from "axios";


class PossibleLabels extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            possible_labels: [],
        };
    }

    update_state() {
        if (Object.values(this.state)[0].length === 0) {
            console.log("update needed");
            const response = axios.get(`http://127.0.0.1:5001/v2/get_information_dataset/Wildfire_Dataset_test_labels`).then(result => {
                let possible_labels_ds = result.data.labels.split(", ");
                this.setState({
                    possible_labels: possible_labels_ds,
                });
            });
        }
        else {
        }
    }


    render() {
        this.update_state();
        return this.state.possible_labels.map((label) => <option>{label}</option>);
    }
}


export default PossibleLabels;