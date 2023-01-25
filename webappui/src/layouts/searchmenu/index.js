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
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Searchbar from "../../components/SearchBar/Searchbar";
import TrendyDatasets from "../../components/TrendyDatasets";
import axios from "axios";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import { checkPropTypes } from "prop-types";
import './searchmenu.css';

function Searchmenu() {

    const { research } = useParams();
    const [bucketList,setBucketList] = useState(["empty"]);
    const [searchbarbucketList,setsearchbarBucketList] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5001/v2/researchBucket/` + research)
            .then((res) => {
                setBucketList(res.data.data);
        });
        console.log(bucketList)
        axios.get(`http://127.0.0.1:5001/v2/getBucketList`)
        .then((res) => {
            setsearchbarBucketList(res.data.data);
        })
        console.log(searchbarbucketList)
        }, []);

        
    const BucketNameList = searchbarbucketList.map((bucket) => bucket.name);

    if (bucketList[0]!="empty") {
    return (
        <DashboardLayout>
            <Searchbar placeholder="Search your dataset ..." data={BucketNameList} />
            <div>
                {bucketList.length !=0 ? (
                <div className="SearchResult">
                    {bucketList.slice(0, 15).map((value)=> {
                        return (
                            <Grid className="ResultBox">
                            <TrendyDatasets dataset_name={value.name} dataset_description="Click Me" header="dataset"/>
                            </Grid>
                        );
                    })}
                </div>
                ): <p>No documents match the specified search terms</p>}

            </div>
        </DashboardLayout>
    );
    } else { return (
        <DashboardLayout>
        <Searchbar placeholder="Search your dataset ..." data={BucketNameList} />
        </DashboardLayout>
    )}

}

export default Searchmenu;
