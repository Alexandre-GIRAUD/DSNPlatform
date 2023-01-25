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

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "../../components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "../../examples/Cards/StatisticsCards/MiniStatisticsCard";
import Searchbar from "./components/SearchBar/Searchbar";

// Dashboard layout components
import TrendyDatasets from "./components/TrendyDatasets";
import OfferCompanies from "./components/OfferCompanies";
import {SoftUI} from "../../context/softUIContext"

function Dashboard() {
  const [BucketList, setBucketList] = useState([]);
  const [NbDataset, setNbDataset] = useState();
  const [NbNewDataset, setNbNewDataset] = useState();
  useEffect(() => {
    axios.get(`http://127.0.0.1:5001/v2/getBucketList`)
      .then((res) => {
        setBucketList(res.data.data);
        setNbDataset(res.data.nb_bucket);
        setNbNewDataset(res.data.nb_new_bucket);
      });
  }, []);

  const BucketNameList = BucketList.map((bucket) => bucket.name);

  const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)

  return (
    <DashboardLayout> 
      <Searchbar placeholder="Search your dataset ..." data={BucketNameList} />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total datasets" }}
                count={NbDataset}
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new datasets" }}
                count={NbNewDataset}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info" }}
              />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <TrendyDatasets dataset_name="Wildfire_dsn" dataset_description="Satellite images of wildfires" header="Dataset Recommended for you" />
            </Grid>
            <Grid item xs={12} lg={5}>
              <TrendyDatasets dataset_name="Car" dataset_description="Image of cars for object detection" header="Dataset Recommended for you"/>
            </Grid>
          </Grid>
        </SuiBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <OfferCompanies />
          </Grid>
        </Grid>
      </SuiBox>

    </DashboardLayout>
  );
}

export default Dashboard;
