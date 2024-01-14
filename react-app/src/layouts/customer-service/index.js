import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { fetchCustomerById, createCustomer, uncaughtErrorCustomer } from "utils";
import { useMaterialUIController } from "context";
import Endpoints from "examples/Endpoints";
import { EP_TYPES } from "utils/constants";
import { onChangeNumber } from "utils";
import MDButton from "components/MDButton";

function CustomerService() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [response3, setResponse3] = useState(null);

  const [loadingRequest1, setLoadingRequest1] = useState(false);
  const [loadingRequest2, setLoadingRequest2] = useState(false);
  const [loadingRequest3, setLoadingRequest3] = useState(false);

  const [getRequest1Value1, setGetRequest1Value1] = useState("");
  const [getRequest2Value1, setGetRequest2Value1] = useState("");
  const [getRequest2Value2, setGetRequest2Value2] = useState("");
  const [getRequest2Value3, setGetRequest2Value3] = useState("");

  const [alert, setAlert] = useState({ isVisible: false, text: "" });

  const callbackRequest1 = () => {
    setLoadingRequest1(true);
    fetchCustomerById(getRequest1Value1, setResponse1, setLoadingRequest1);
  };

  const callbackRequest2 = () => {
    setLoadingRequest2(true);
    createCustomer(
      { firstName: getRequest2Value1, lastName: getRequest2Value2, cardId: getRequest2Value3 },
      setResponse2,
      setLoadingRequest2
    );
  };

  const callbackRequest3 = () => {
    setLoadingRequest3(true);
    uncaughtErrorCustomer(setResponse3, setLoadingRequest3);
  };

  const renderAlert = (text) => {
    return (
      <MDBox>
        <MDAlert
          color="warning"
          dismissible
          onDismiss={() => {
            setAlert({ isVisible: false, text: "" });
          }}
        >
          {text}
        </MDAlert>
      </MDBox>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {alert.isVisible && renderAlert(alert.text)}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={8.5} md={5.5} lg={4.3}>
            <Card>
              <Endpoints
                type={EP_TYPES.GET}
                url={
                  getRequest1Value1 !== "" && !isNaN(getRequest1Value1)
                    ? "/customer-service/api/customer/getById/" + String(getRequest1Value1)
                    : "/customer-service/api/customer/getById/$id"
                }
                callback={callbackRequest1}
                setAlert={setAlert}
                requestStatus={{ response: response1, loading: loadingRequest1 }}
                requestData={[
                  {
                    key: "id",
                    disabled: loadingRequest1,
                    type: "number",
                    value: getRequest1Value1,
                    placeholder: "Type the customer id",
                    label: "Customer Id",
                    onChange: (value) => {
                      onChangeNumber(value, setGetRequest1Value1);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && Number(value) > 0;
                    },
                  },
                ]}
              />
            </Card>
          </Grid>

          <Grid item xs={8.5} md={5.5} lg={4.2}>
            <Card>
              <Endpoints
                type={EP_TYPES.POST}
                url={"/customer-service/api/customer/create"}
                callback={callbackRequest2}
                setAlert={setAlert}
                requestStatus={{ response: response2, loading: loadingRequest2 }}
                requestData={[
                  {
                    key: "firstName",
                    disabled: loadingRequest2,
                    type: "text",
                    value: getRequest2Value1,
                    placeholder: "Type the customer's firstname",
                    label: "First Name",
                    onChange: (value) => {
                      setGetRequest2Value1(value);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && value.length > 2 && value.length < 33;
                    },
                  },
                  {
                    key: "lastName",
                    disabled: loadingRequest2,
                    type: "text",
                    value: getRequest2Value2,
                    placeholder: "Type the customer's lastname",
                    label: "Last Name",
                    onChange: (value) => {
                      setGetRequest2Value2(value);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && value.length > 2 && value.length < 33;
                    },
                  },
                  {
                    key: "cardId",
                    disabled: loadingRequest2,
                    type: "number",
                    value: getRequest2Value3,
                    placeholder: "Type the card id",
                    label: "Card Id",
                    onChange: (value) => {
                      onChangeNumber(value, setGetRequest2Value3);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && Number(value) > 0;
                    },
                  },
                ]}
              />
            </Card>
          </Grid>

          <Grid item xs={8.5} md={5.5} lg={4.3}>
            <Card>
              <Endpoints
                type={EP_TYPES.GET}
                url={"/customer-service/api/customer/error"}
                callback={callbackRequest3}
                setAlert={setAlert}
                requestStatus={{ response: response3, loading: loadingRequest3 }}
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

export default CustomerService;
