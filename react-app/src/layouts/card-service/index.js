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

import { fetchCardById, createCard, uncaughtErrorCard, fetchExchangeRate } from "utils";
import { useMaterialUIController } from "context";
import Endpoints from "examples/Endpoints";
import { EP_TYPES } from "utils/constants";
import { onChangeNumber } from "utils";
import MDButton from "components/MDButton";

function CardService() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const [response3, setResponse3] = useState(null);
  const [response4, setResponse4] = useState(null);

  const [loadingRequest1, setLoadingRequest1] = useState(false);
  const [loadingRequest2, setLoadingRequest2] = useState(false);
  const [loadingRequest3, setLoadingRequest3] = useState(false);
  const [loadingRequest4, setLoadingRequest4] = useState(false);

  const [getRequest1Value1, setGetRequest1Value1] = useState("");
  const [getRequest2Value1, setGetRequest2Value1] = useState("");
  const [getRequest2Value2, setGetRequest2Value2] = useState("");

  const [alert, setAlert] = useState({ isVisible: false, text: "" });

  const callbackRequest1 = () => {
    setLoadingRequest1(true);
    fetchCardById(getRequest1Value1, setResponse1, setLoadingRequest1);
  };

  const callbackRequest2 = () => {
    setLoadingRequest2(true);
    createCard(
      { cardNumber: getRequest2Value1, cvv: getRequest2Value2 },
      setResponse2,
      setLoadingRequest2
    );
  };

  const callbackRequest3 = () => {
    setLoadingRequest3(true);
    uncaughtErrorCard(setResponse3, setLoadingRequest3);
  };

  const callbackRequest4 = () => {
    setLoadingRequest4(true);
    fetchExchangeRate(setResponse4, setLoadingRequest4);
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
                    ? "/card-service/api/card/getById/" + String(getRequest1Value1)
                    : "/card-service/api/card/getById/$id"
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
                    placeholder: "Type the card id",
                    label: "Card Id",
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

          <Grid item xs={8.5} md={5.5} lg={3}>
            <Card>
              <Endpoints
                type={EP_TYPES.POST}
                url={"/card-service/api/card/create"}
                callback={callbackRequest2}
                setAlert={setAlert}
                requestStatus={{ response: response2, loading: loadingRequest2 }}
                requestData={[
                  {
                    key: "cardNumber",
                    disabled: loadingRequest2,
                    type: "number",
                    value: getRequest2Value1,
                    placeholder: "Type the card number",
                    label: "Card Number",
                    onChange: (value) => {
                      onChangeNumber(value, setGetRequest2Value1);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && Number(value) > 0 && value.length == 16;
                    },
                  },
                  {
                    key: "cvv",
                    disabled: loadingRequest2,
                    type: "number",
                    value: getRequest2Value2,
                    placeholder: "Type the CVV",
                    label: "Card Verification Value",
                    onChange: (value) => {
                      onChangeNumber(value, setGetRequest2Value2);
                    },
                    validationRule: (value) => {
                      if (value == "") {
                        return true;
                      }
                      return typeof value == "string" && Number(value) > 0 && value.length == 3;
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
                url={"/card-service/api/card/error"}
                callback={callbackRequest3}
                setAlert={setAlert}
                requestStatus={{ response: response3, loading: loadingRequest3 }}
                requestData={[]}
              />
            </Card>
          </Grid>

		  <Grid item xs={8.5} md={5.5} lg={4.3}>
            <Card>
              <Endpoints
                type={EP_TYPES.GET}
                url={"/card-service/api/card/exchangeRate"}
                callback={callbackRequest4}
                setAlert={setAlert}
                requestStatus={{ response: response4, loading: loadingRequest4 }}
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

export default CardService;
