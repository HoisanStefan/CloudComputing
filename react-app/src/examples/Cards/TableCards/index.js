// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

import { useMaterialUIController } from "context";

// React-App React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function TableCard({ data }) {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const light = darkMode;

  return (
    <Card>
      <MDBox color="inherit" position="relative" borderRadius="lg" mt={-3} mx={2}>
        <MDTypography
          fontWeight="bold"
          textTransform="capitalize"
          variant="h1"
          color={light ? "white" : "dark"}
          noWrap
        >
          {data.title.replace("-", " ")}
        </MDTypography>
        <table>
          <thead>
            {data.thead.map((theadRow, theadRowIndex) => (
              <tr key={theadRowIndex}>
                {theadRow.map((th, thIndex) => (
                  <th style={{ color: light ? "#fff" : "#000" }} key={thIndex}>
                    {th}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data.tbody.map((tbodyRow, tbodyRowIndex) => (
              <tr key={tbodyRowIndex}>
                {tbodyRow.map((cell, cellIndex) => (
                  <td style={{ color: light ? "#fff" : "#000" }} key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </MDBox>
    </Card>
  );
}

TableCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TableCard;
