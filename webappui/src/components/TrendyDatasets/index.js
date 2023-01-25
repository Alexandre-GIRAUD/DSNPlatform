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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import {Link } from "react-router-dom";
// Soft UI Dashboard React components
import SuiBox from "../SuiBox";
import SuiTypography from "../SuiTypography";

// Images
//import images_dataset from "../../../../assets/images/illustrations/";

function TrendyDatasets(props) {

    var name_ds = props.dataset_name;
    var description_ds = props.dataset_description;
    var header = props.header;

    return (
        <Link to={"/datasets/" + name_ds.toLowerCase() +"_dsn_175882445073278234578"}>
            <Card sx={{ "&:hover": {cursor: "pointer"}}}>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiBox pt={1} mb={0.5}>
                                    <SuiTypography variant="body2" color="text" fontWeight="medium">
                                        {header}
                                    </SuiTypography>
                                </SuiBox>
                                <SuiTypography variant="h5" fontWeight="bold" gutterBottom>
                                    {name_ds}
                                </SuiTypography>
                                <SuiBox mb={6}>
                                    <SuiTypography variant="body2" color="text">
                                        {description_ds}
                                    </SuiTypography>
                                </SuiBox>
                                <SuiTypography
                                    component="a"
                                    href="#"
                                    variant="button"
                                    color="text"
                                    fontWeight="medium"
                                    sx={{
                                        mt: "auto",
                                        mr: "auto",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        cursor: "pointer",

                                        "& .material-icons-round": {
                                            fontSize: "1.125rem",
                                            transform: `translate(2px, -0.5px)`,
                                            transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
                                        },

                                        "&:hover .material-icons-round, &:focus  .material-icons-round": {
                                            transform: `translate(6px, -0.5px)`,
                                        },
                                    }}
                                >
                                    Read More
                                    <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                                </SuiTypography>
                            </SuiBox>
                        </Grid>
                        <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
                            <img src={"https://storage.googleapis.com/dataset_page_images/" + name_ds.toLowerCase()}  height="150px" width="250px" onError={({ currentTarget }) => {currentTarget.onerror = null;currentTarget.src="https://storage.googleapis.com/dataset_page_images/default.png";}} />
                        </Grid>
                    </Grid>
                </SuiBox>
            </Card>
        </Link>
    );
}

export default TrendyDatasets;
