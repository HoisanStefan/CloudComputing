// react-router-dom components
import { Link as LinkDom } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// React-App React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);
  const currentRoute = route[route.length - 1];

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MDBox display="flex">
        <MDBox>
          <MuiBreadcrumbs
            sx={{
              "& .MuiBreadcrumbs-separator": {
                color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
              },
            }}
          >
            <LinkDom to="/">
              <MDTypography
                component="span"
                variant="body2"
                color={light ? "white" : "dark"}
                opacity={light ? 0.8 : 0.5}
                sx={{ lineHeight: 0 }}
              >
                <Icon>{icon}</Icon>
              </MDTypography>
            </LinkDom>
            {routes.map((el) => (
              <LinkDom to={`/${el}`} key={el}>
                <MDTypography
                  component="span"
                  variant="button"
                  fontWeight="regular"
                  textTransform="capitalize"
                  color={light ? "white" : "dark"}
                  opacity={light ? 0.8 : 0.5}
                  sx={{ lineHeight: 0 }}
                >
                  {el}
                </MDTypography>
              </LinkDom>
            ))}
            <MDTypography
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              sx={{ lineHeight: 0 }}
            >
              {title.replace("-", " ")}
            </MDTypography>
          </MuiBreadcrumbs>
          <MDTypography
            fontWeight="bold"
            textTransform="capitalize"
            variant="h6"
            color={light ? "white" : "dark"}
            noWrap
          >
            {title.replace("-", " ")}
          </MDTypography>
        </MDBox>

        {(currentRoute == "customer-service" || currentRoute == "card-service") && (
          <MDBox ml={3} pt={0.8}>
            <MDButton
              component={Link}
              // TODO: change localhost
              href={
                currentRoute == "customer-service"
                  ? "http://localhost:8080/actuator/health"
                  : "http://localhost:8082/actuator/health"
              }
              target="_blank"
              rel="noreferrer"
              size="small"
              color={light ? "light" : "dark"}
            >
              {"Check Health"}
            </MDButton>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
