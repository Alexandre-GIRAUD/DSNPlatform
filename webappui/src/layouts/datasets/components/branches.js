import React from "react";
import "./styles.css"
import Select from "react-select";
import axios from 'axios';

const branches = [
    { value: 'main', label: 'Main' },
];;



class SelectBranch extends React.Component {
    state = {
        selectedOption: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            nb_branches: "No branches",
        };
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };


    update_state() {
        if (Object.values(this.state)[0] === "No branches") {
            console.log("update needed");
            const response = axios.get(`http://127.0.0.1:5001/v2/get_information_dataset/Wildfire_Dataset`).then(result => {
                console.log(result);
                const nb_branches_1 = parseInt(result.data.nb_branches) + 1;
                this.setState({
                    nb_branches: nb_branches_1,
                });
            });
        }
        else {
            console.log("no update needed");
        }
    }

    render() {
        const { selectedOption } = this.state;
        this.update_state();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" class="cont_br_parent">
                        <div class="container_branches">
                            <h5>Branches: </h5>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={branches}
                            />
                            <h3>{this.state.nb_branches} branche(s)</h3>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SelectBranch;