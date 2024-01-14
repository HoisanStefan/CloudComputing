import axios from "axios";

import { URLS, ENDPOINTS, PORTS } from "./constants";

const defaultHeaders = {
  Authorization: "Bearer=ABC",
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const extractData = (table) => {
  const extractedData = { thead: [], tbody: [] };

  const theadRows = table.querySelectorAll("thead tr");
  theadRows.forEach((theadRow) => {
    const theadRowData = [];
    theadRow.querySelectorAll("th").forEach((th) => {
      theadRowData.push(th.textContent.trim());
    });
    extractedData.thead.push(theadRowData);
  });

  const tbodyRows = table.querySelectorAll("tbody tr");
  tbodyRows.forEach((tbodyRow) => {
    const tbodyRowData = [];
    tbodyRow.querySelectorAll("td").forEach((cell) => {
      tbodyRowData.push(cell.textContent.trim());
    });
    extractedData.tbody.push(tbodyRowData);
  });

  return extractedData;
};

export const onChangeNumber = (value, setValue) => {
  const re = /^[0-9\b]+$/;
  if (isNaN(value)) {
    return;
  }
  if (value == "") {
    setValue(value);
    return;
  }
  if (re.test(value)) {
    setValue(String(parseInt(value)));
  }
};

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: defaultHeaders,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, {
      headers: defaultHeaders,
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error("Error post request:", error);
    throw error;
  }
};

export const fetchCardById = async (id, setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await fetchData("http://localhost:9090/card-service/api/card/getById/" + id);
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const fetchCustomerById = async (id, setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await fetchData(
      "http://localhost:9090/customer-service/api/customer/getById/" + id
    );
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const fetchEureka = async (
  setTableDataArray,
  setTableGeneralData,
  setTableInfoData,
  setData,
  setLoading
) => {
  try {
    // TODO: change localhost
    const result = await fetchData("http://localhost:" + PORTS.EUREKA);

    const tempElement = document.createElement("div");
    tempElement.innerHTML = result;

    const tables = tempElement.querySelectorAll("table#instances");
    const generalTable = tempElement.querySelector("table#generalInfo");
    const infoTable = tempElement.querySelector("table#instanceInfo");

    const extractedTableDataArray = [];
    const extractedGeneralDataTable = [];
    const extractedInfoDataTable = [];

    tables.forEach((table) => {
      let extractedData = extractData(table);
      if (extractedData.thead.length == 0) {
        extractedData.title = "System Status";
      } else {
        extractedData.title = "Instances currently registered with Eureka";
      }

      extractedTableDataArray.push(extractedData);
    });

    if (generalTable) {
      let extractedData = extractData(generalTable, true);
      extractedData.title = "General Info";
      extractedGeneralDataTable.push(extractedData);
    }

    if (infoTable) {
      let extractedData = extractData(infoTable);
      extractedData.title = "Instance Info";
      extractedInfoDataTable.push(extractedData);
    }

    // Update state with the extracted data
    setTableDataArray(extractedTableDataArray);
    setTableGeneralData(extractedGeneralDataTable);
    setTableInfoData(extractedInfoDataTable);
    setData(result);
    setLoading(false);
  } catch (error) {
    console.log(error);
  } finally {
  }
};

export const fetchExchangeRate = async (setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await fetchData("http://localhost:9090/card-service/api/card/exchangeRate");
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const uncaughtErrorCustomer = async (setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await fetchData("http://localhost:9090/customer-service/api/customer/error");
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const uncaughtErrorCard = async (setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await fetchData("http://localhost:9090/card-service/api/card/error");
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const createCard = async (data, setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await postRequest("http://localhost:9090/card-service/api/card/create", data);
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const createCustomer = async (data, setData, setLoading) => {
  try {
    // TODO: change localhost
    const result = await postRequest(
      "http://localhost:9090/customer-service/api/customer/create",
      data
    );
    console.log(result);
    setData(result);
  } catch (error) {
    setData(error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};
