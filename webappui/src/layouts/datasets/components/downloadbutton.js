import React from "react";

import SuiButton from "../../../components/SuiButton";
import axios from "axios";
//import { list_dataset } from "./create_function";

class Downloadbutton extends React.Component {

    //Connect with API v2/downloadBucket
    handleClick = () => {
        axios({
            url: `http://127.0.0.1:5001/v2/downloadBucket/${this.props.bucketname}/${this.props.prefix}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.props.bucketname + ".zip"); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };

    render() {

        return (
            <div>
                <SuiButton onClick={this.handleClick} variant="gradient" color="dark">
                    Download {this.props.prefix}
                </SuiButton>
            </div>
        );
    }

}

export default Downloadbutton;