import React from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import axios from "axios";


class DatasetDescription extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataset_description: "0",
            nb_collaborators: "0",
            ratings: "0",
            dataset_name: "",
            id_author: "",
            name_author: "Jean Jaurès"
        };
    }

    update_state() {
        if (Object.values(this.state)[0] === "0") {
            const response = axios.get(`http://127.0.0.1:5001/v2/get_information_dataset/${this.props.datasetname}`).then(result => {
                const dataset_description_1 = result.data.description;
                const dataset_name_1 = result.data.name.replace("_dsn_175882445073278234578", "");
                const dataset_nb_collaborators_1 = result.data.nb_collaborators;
                const dataset_ratings_1 = result.data.ratings;
                const id_author_1 = result.data.id_author
                const response_user = axios.get(`http://127.0.0.1:5001/v2/getUsersInformation/${id_author_1}`).then(result => {
                    this.setState({
                        name_author: result.data,
                    });
                })
                this.setState({
                    dataset_description: dataset_description_1,
                    dataset_name: dataset_name_1,
                    nb_collaborators: dataset_nb_collaborators_1,
                    ratings: dataset_ratings_1,
                    id_author: id_author_1
                });
            });


        }
        else {
        }
    }


    render() {
        this.update_state();
        return (
            <div class="dataset_description">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={3}>
                        <h3>{this.state.dataset_name}</h3>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <p>Collaborators : {this.state.nb_collaborators}</p>
                        <p>Ratings : {this.state.ratings}Not Yet Available</p>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <h5>Creator : {this.state.name_author}</h5>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default DatasetDescription;