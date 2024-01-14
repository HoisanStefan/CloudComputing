import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TableCards from "examples/Cards/TableCards";

// Data
import { fetchEureka } from "utils";

import ClipLoader from "react-spinners/ClipLoader";

function Eureka() {
  const [data, setData] = useState(null);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [tableGeneralData, setTableGeneralData] = useState([]);
  const [tableInfoData, setTableInfoData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEureka(setTableDataArray, setTableGeneralData, setTableInfoData, setData, setLoading);

    const intervalId = setInterval(() => {
      fetchEureka(setTableDataArray, setTableGeneralData, setTableInfoData, setData, setLoading);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading == true || data == undefined ? (
        <ClipLoader
          color={"blue"}
          loading={true}
          cssOverride={{ display: "block", margin: "0 auto", borderColor: "blue" }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <MDBox py={3}>
          <Grid container spacing={3}>
		  <Grid item xs={9} md={6} lg={4}>
              <MDBox mb={1.5}>
				<TableCards data={tableGeneralData[0]} />
              </MDBox>
            </Grid>

			<Grid item xs={16} md={10} lg={8}>
              <MDBox mb={1.5}>
				<TableCards data={tableDataArray[2]} />
              </MDBox>
            </Grid>
			
            <Grid item xs={7} md={6} lg={4}>
              <MDBox mb={1.5}>
                <TableCards data={tableDataArray[1]} />
              </MDBox>
            </Grid>

			<Grid item xs={7} md={4} lg={3}>
              <MDBox mb={1.5}>
				<TableCards data={tableInfoData[0]} />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default Eureka;
