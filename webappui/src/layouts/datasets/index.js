/**
=========================================================
* Soft UI Dashboard React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Soft UI Dashboard React components
import {useContext, UseState, useEffect} from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DatasetDescription from "./components/datasetDescription";
import Options from "./components/options.js"
import DatasetOverview from "./components/datasetOverview";
import {SoftUI} from "../../context/softUIContext"


function Datasets() {
    const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)

    const { dataset_name } = useParams();

    return (
        <DashboardLayout>
            <DatasetDescription datasetname={dataset_name} />
            <Options datasetname={dataset_name} user={currentUser}/>
            <DatasetOverview datasetname={dataset_name}/>
        </DashboardLayout>
    );
}

export default Datasets;
