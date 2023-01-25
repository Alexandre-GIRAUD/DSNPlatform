import React from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";
import SelectBranch from "./branches";
import SuiButton from "../../../components/SuiButton";
import Downloadbutton from "./downloadbutton";
import Favbutton from "./favbutton"
import UnFavbutton from "./unfavbutton"
import { Link } from "react-router-dom";

class Options extends React.Component {
    // this.props.isFollow représente la variable pour savoir si le dataset est follow ou pas
    // TODO : this.props.isFollow

    render() {
        if (this.props.isFollow) {
            return (
                <div class="options">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} xl={4}>
                            <SelectBranch />
                        </Grid>
                        <Grid item xs={12} sm={6} xl={4}>
                            <div class="container_button">
                                <Link to={"/datasets/" + this.props.datasetname + "/collaboration_page"}>
                                    <SuiButton variant="gradient" color="dark">
                                        Collaborate
                                    </SuiButton>
                                </Link>
                                <div class="vertical-separator" stlye="display: inline"></div>
                                <Downloadbutton bucketname={this.props.datasetname} />
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={3} xl={1}>
                            <div class="un_fav_button">
                                <UnFavbutton bucketname={this.props.datasetname} user={this.props.user}></UnFavbutton>
                            </div>
                        </Grid>
                    </Grid>
                </div >
            );
        }
        else {
            return (
                <div class="options">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} xl={4}>
                            <SelectBranch />
                        </Grid>
                        <Grid item xs={12} sm={6} xl={4}>
                            <div class="container_button">
                                <Link to={"/datasets/" + this.props.datasetname + "/collaboration_page"}>
                                    <SuiButton variant="gradient" color="dark">
                                        Collaborate
                                    </SuiButton>
                                </Link>
                                <div class="vertical-separator" stlye="display: inline"></div>
                                <Downloadbutton bucketname={this.props.datasetname} prefix={"withlabel"} />
                                <br></br>
                                <Downloadbutton bucketname={this.props.datasetname} prefix={"withoutlabel"} />
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={3} xl={1}>
                            <div class="fav_button">
                                <Favbutton bucketname={this.props.datasetname} user={this.props.user}></Favbutton>
                            </div>
                        </Grid>
                    </Grid>
                </div >
            );
        }
    }
}


export default Options;