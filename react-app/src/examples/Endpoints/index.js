import React, { useEffect, useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { useMaterialUIController } from "context";

// React-App React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { EP_TYPES } from "utils/constants";

import ClipLoader from "react-spinners/ClipLoader";

function Endpoints({ type, url, requestData, requestStatus, callback, setAlert }) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const renderLoader = () => {
    return (
      <MDBox pt={3} pb={3}>
        <ClipLoader
          color={"blue"}
          loading={true}
          cssOverride={{ display: "block", margin: "0 auto", borderColor: "blue" }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </MDBox>
    );
  };

  const renderResponse = () => {
    let response = requestStatus.response;
    let isError = false;

    if (requestStatus.response?.name === "AxiosError") {
      isError = true;
      if (requestStatus.response?.response) {
        response = requestStatus.response.response.data;
      }
    }

    return (
      <MDBox pt={1}>
        <MDTypography variant="h6" color={darkMode ? "white" : "dark"}>
          Response:
        </MDTypography>
        <MDBox
          mt={1}
          py={3}
          px={2}
          variant="gradient"
          bgColor={isError ? "error" : "success"}
          borderRadius="lg"
          coloredShadow={isError ? "error" : "success"}
        >
          <MDTypography variant="h6" color="white">
            {JSON.stringify(response)}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  };

  const onSubmit = () => {
    let isError = false;
    const requiredFields = [];

    requestData.map((field, id) => {
      if (!field.value || field.value == "") {
        isError = true;
        if (requiredFields.length > 0) {
          requiredFields.push(", ");
        } else {
          requiredFields.push("The following fields are required and are empty: ");
        }
        requiredFields.push(field.key);
      }
    });

    if (!isError) {
      isError = false;
      requestData.map((field, id) => {
        if (!field.validationRule(field.value)) {
          isError = true;
          if (requiredFields.length > 0) {
            requiredFields.push(", ");
          } else {
            requiredFields.push("The following fields have invalid values: ");
          }
          requiredFields.push(field.key);
        }
      });

      if (!isError) {
        setAlert({ isVisible: false, text: "" });
        callback();
      } else {
        setAlert({ isVisible: true, text: requiredFields });
      }
    } else {
      setAlert({ isVisible: true, text: requiredFields });
    }
  };

  return (
    <MDBox pt={1} pb={1} px={2}>
      <MDBox display="flex">
        <MDBadge
          border={false}
          container={true}
          badgeContent={type}
          color={type == EP_TYPES.GET ? "success" : type == EP_TYPES.POST ? "warning" : "red"}
          variant="gradient"
          size="sm"
        />
        <MDBox>
          <MDTypography ml={2} mt={0.2} variant="h6" color={darkMode ? "white" : "dark"}>
            URL: {url}
          </MDTypography>
        </MDBox>
      </MDBox>

      {requestData.length > 0 && (
        <MDTypography pt={2} variant="h6" color={darkMode ? "white" : "dark"}>
          Request Form:
        </MDTypography>
      )}

      {requestData.map((row, id) => {
        return (
          <MDBox key={id} pt={1}>
            <RequestFormRow
              id={row.key}
              type={row.type}
              value={row.value}
              onChange={row.onChange}
              validationRule={row.validationRule}
              placeholder={row.placeholder}
              label={row.label}
              disabled={row.disabled}
            />
          </MDBox>
        );
      })}

      {requestStatus.loading && renderLoader()}

      {requestStatus.response != null && renderResponse()}

      <MDBox display="flex" justifyContent="center" pt={2} pb={1.5}>
        <MDButton onClick={onSubmit} color={"info"}>
          {"Submit"}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

function RequestFormRow({
  disabled,
  label,
  id,
  type,
  value,
  onChange,
  validationRule,
  placeholder,
}) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const isError = () => {
    if (validationRule && !validationRule(value)) {
      return true;
    }

    return false;
  };

  return (
    <MDBox autoComplete="off" display="flex">
      <MDTypography
        pt={1}
        mr={1}
        variant="h6"
        textTransform="capitalize"
        sx={{ mb: 0 }}
        color={darkMode ? "white" : "dark"}
      >
        {id}
        {":"}
      </MDTypography>
      <MDInput
        autoComplete="off"
        type={type}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        disabled={disabled}
        error={isError()}
        value={value}
        hiddenLabel
        label={label}
        required
        size="small"
        fullWidth
        variant="outlined"
        placeholder={placeholder}
      />
    </MDBox>
  );
}

RequestFormRow.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  validationRule: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

// Typechecking props for the Endpoints
Endpoints.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  requestStatus: PropTypes.shape.apply({
    response: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
  requestData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  setAlert: PropTypes.func,
};

Endpoints.defaultProps = {
  setAlert: () => {},
};

export default Endpoints;
