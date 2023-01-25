import React from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import axios from "axios";

class DatasetOverview extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nb_data_labelized: "0",
            nb_data_nonlabelized: "0",
            size_dataset: "0",
        };
    }

    update_state() {
        if (Object.values(this.state)[0] === "0") {
            console.log(this.props.datasetname);
            const response_size = axios.get(`http://platform/v2/getSizeDataset/${this.props.datasetname}`).then(result => {
                const size_dataset = result.data;
                console.log("cc0");
                this.setState({
                    size_dataset: size_dataset,
                });
            });
            const response_nb_data_labelized = axios.get(`api/getNbElementsDataset/${this.props.datasetname}/withlabel`).then(result => {
                const nb_data_1 = result.data;
                console.log("cc1");
                this.setState({
                    nb_data_labelized: nb_data_1,
                });
            });
            const response_nb_data_non_labelized = axios.get(`/api/v2/getNbElementsDataset/${this.props.datasetname}/withoutlabel`).then(result => {
                const nb_data_1 = result.data;
                console.log("cc2");
                this.setState({
                    nb_data_nonlabelized: nb_data_1,
                });
            });
        }
        else {
        }
    }

    render() {
        this.update_state();
        return (
            <div class="dataset_overview">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={3}>
                        <br></br>
                        <h3>Stats</h3>
                        <p>{this.state.size_dataset} bytes</p>
                        <p>{this.state.nb_data_labelized} labelized images</p>
                        <p>{this.state.nb_data_nonlabelized} unlabelized images</p>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={3}>
                        <br></br>
                        <h3>Overview of the data :</h3>
                        <img src={"https://storage.googleapis.com/dataset_page_images/" + this.props.datasetname.replace("_dsn_175882445073278234578", "")} width="1000px" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "https://storage.googleapis.com/dataset_page_images/default.png"; }} alt="" ></img>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default DatasetOverview;