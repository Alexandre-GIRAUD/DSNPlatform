import React from "react";

import SuiButton from "../../../components/SuiButton";
import axios from "axios";
//import { list_dataset } from "./create_function";

class UnFavbutton extends React.Component {

    //Connect with API v2/downloadBucket
    //Unfave
    handleClick = () => {
        axios.get(`http://127.0.0.1:5001/v2/unFav/${this.props.user.uid}/${this.props.bucketname}`).then((res) => console.log(res));
    };

    render() {

        return (
            <div>
                <SuiButton onClick={this.handleClick} variant="gradient">
                    Unfollow
                </SuiButton>
            </div>
        );
    }

}
export default UnFavbutton;