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

//React 
import React, { useEffect, useState, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "../../components/SuiBox";
import SuiButton from "../../components/SuiButton";
import SuiBadge from "../../components/SuiBadge";
import SuiTypography from "../../components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Table from "../../examples/Tables/Table";
import Dataset from "./data/PersonalDatasets"
import Function from "./data/PersonalDatasets"
// Data
import DatasetData from "./data/PersonalDatasets";
import Row from "./data/PersonalDatasets";
import { Link } from "react-router-dom";
import axios from "axios";
import Searchbar from "../../components/SearchBar/Searchbar";
import {SoftUI} from "../../context/softUIContext"


function Tables() {


  const { columns, rows } = DatasetData;
  const [bucketdata, setbucketData] = useState([]);
  const [followeddata,setfollowedData] = useState([]);
  const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)

  useEffect(() => {
    axios.get(`http://127.0.0.1:5001/v2/getUserBucketList/${currentUser.uid}`)
      .then((res) => setbucketData(res.data.data));
    axios.get(`http://127.0.0.1:5001/v2/getUserFavBucketList/${currentUser.uid}`)
      .then((res) => setfollowedData(res.data.data));

  }, []); //[data]

  const BucketNameList = bucketdata.map((bucket) => bucket.name);


  const rowsbucket = bucketdata.map((bucket) => (
    {
      name: <Link to={"/datasets/" + bucket.name + "_dsn_175882445073278234578"}>{bucket.name}</Link>,
      function: <SuiBadge variant="gradient" badgeContent="Admin" color="success" size="xs" container />,
      status: <SuiBadge variant="gradient" badgeContent="public" color="success" size="xs" container />,
      created: <SuiTypography variant="caption" color="secondary" fontWeight="medium">{bucket.time_created}</SuiTypography>,
    }))

    const rowsfollowedbucket = followeddata.map((bucket) => (
      {
        name: <Link to={"/datasets/" + bucket.name + "_dsn_175882445073278234578"}>{bucket.name}</Link>,
        function: <SuiBadge variant="gradient" badgeContent="Admin" color="success" size="xs" container />,
        status: <SuiBadge variant="gradient" badgeContent="public" color="success" size="xs" container />,
        created: <SuiTypography variant="caption" color="secondary" fontWeight="medium">X</SuiTypography>,
      }))



  return (
    <DashboardLayout>
      <Searchbar placeholder="Search your dataset ..." data={BucketNameList} />
      <Link to="/dataset_creation">
        <SuiButton
          component="a"
          target="_blank"
          rel="noreferrer"
          variant="gradient"
          width="500"
        >
          Create a new dataset
        </SuiButton>
      </Link>
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Your datasets</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rowsbucket} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>

      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Followed datasets</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rowsfollowedbucket} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
