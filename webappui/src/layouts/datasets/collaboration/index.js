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
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DatasetDescription from "../components/datasetDescription";
import Upload from "./components/upload.js"
import Labelization from "./components/labelization.js"
import { useParams } from "react-router-dom";
import Gallery from "./components/gallery";
import Wrapper_Galery from "./components/wrapper_galery";
import { useState, useRef, useEffect } from "react";
import axios from 'axios';




const Collaboration = () => {

    const { dataset_name } = useParams();
    console.log(dataset_name);

    return (
        <DashboardLayout>
            <DatasetDescription datasetname={dataset_name} />
            <Upload datasetname={dataset_name} />
            <Wrapper_Galery datasetname={dataset_name} />
            <br />
            <Labelization datasetname={dataset_name} />
        </DashboardLayout >
    );
}

export default Collaboration;
