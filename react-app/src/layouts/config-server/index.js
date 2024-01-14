import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { fetchCardConfig, fetchCustomerConfig } from "utils";
import { useMaterialUIController } from "context";
import Endpoints from "examples/Endpoints";
import { EP_TYPES } from "utils/constants";

function ConfigServer() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);

  const [loadingRequest1, setLoadingRequest1] = useState(false);
  const [loadingRequest2, setLoadingRequest2] = useState(false);


  const callbackRequest1 = () => {
    setLoadingRequest1(true);
	fetchCardConfig(setResponse1, setLoadingRequest1)
  };

  const callbackRequest2 = () => {
    setLoadingRequest2(true);
	fetchCustomerConfig(setResponse2, setLoadingRequest2)
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Endpoints
                type={EP_TYPES.GET}
                url={"/card-service/default"}
                callback={callbackRequest1}
                requestStatus={{ response: response1, loading: loadingRequest1 }}
                requestData={[]}
              />
            </Card>
          </Grid>

		  <Grid item xs={12} md={6} lg={6}>
            <Card>
              <Endpoints
                type={EP_TYPES.GET}
                url={"/customer-service/default"}
                callback={callbackRequest2}
                requestStatus={{ response: response2, loading: loadingRequest2 }}
                requestData={[]}
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ConfigServer;
