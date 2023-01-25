// Soft UI Dashboard React components
import React from "react";
import SuiBox from "../../../components/SuiBox";
import SuiTypography from "../../../components/SuiTypography";
import SuiBadge from "../../../components/SuiBadge";
import { Link } from "react-router-dom";
import axios from "axios";


function Dataset({ name }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          <Link to="/datasets">{name}</Link>
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

function Function({ job, org }) {
  return (
    <SuiBox display="flex" flexDirection="column">
      <SuiTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SuiTypography>
      <SuiTypography variant="caption" color="secondary">
        {org}
      </SuiTypography>
    </SuiBox>
  );
}

const Row = (props) => {
  return (
    {
      name: <Dataset name={props.ds_name} />,
      function: <Function job={props.ds_job} org="Open Source" />,
      status: (
        <SuiBadge variant="gradient" badgeContent={props.ds_status} color="success" size="xs" container />
      ),
      created: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          {props.ds_creation_date}
        </SuiTypography>
      ),
    }
  )
}

export default {
  columns: [
    { name: "name", align: "left" },
    { name: "function", align: "left" },
    { name: "status", align: "center" },
    { name: "created", align: "center" },
  ],

  rows: [
    {
      name: <Dataset name="Wildfires" />,
      function: <Function job="Admin" org="Open Source" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="public" color="success" size="xs" container />
      ),
      created: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SuiTypography>
      ),
    },
    {
      name: <Dataset name="Named Entities" />,
      function: <Function job="Admin" org="Open Source" />,
      status: (
        <SuiBadge variant="gradient" badgeContent="private" color="secondary" size="xs" container />
      ),
      created: (
        <SuiTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SuiTypography>
      ),
    },
  ],
};
