import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React, { useState } from "react";

const details = {
  poNo: "",
  programName: "",
  category: "",
  gstNo: "",
  leadNo: "",
  vendorName: "",
  contactPerson: "",
  phone: "",
  deliveryAddress: "",
  deliveryDate: "",
  issueDate: "",
};
const Details = (props) => {
  const [makeDetail, setMakeDetail] = useState(details);

  const DateGenerator = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
  };

  const onTextChange = (e) => {
    let changeDetails = {
      ...makeDetail,
      [e.target.name]: e.target.value,
    };
    setMakeDetail(changeDetails);
    props.details(makeDetail);
  };

  const onDeliveryDateChange = (date) => {
    let changeDetailsDate = {
      ...makeDetail,
      [makeDetail.deliveryDate]: date,
    };

    setMakeDetail(changeDetailsDate);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            margin: "0rem 1rem",
            gap: "1.5rem",
            flexDirection: "column",
          }}
        >
          <TextField
            onChange={(e) => onTextChange(e)}
            id="poNo"
            name="poNo"
            label="PO No."
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="programName"
            name="programName"
            label="Program name"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="category"
            name="category"
            label="Category"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="gstNo"
            name="gstNo"
            label="GST No"
            variant="outlined"
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1.5rem",
            flexDirection: "column",
            margin: "0rem 1rem",
          }}
        >
          <TextField
            onChange={(e) => onTextChange(e)}
            id="leadNo"
            name="leadNo"
            label="Lead No"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="vendorName"
            name="vendorName"
            label="Vendor Name"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="contactPerson"
            name="contactPerson"
            label="Contact Person"
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            name="phone"
            id="phone"
            label="Phone"
            variant="outlined"
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1.5rem",
            flexDirection: "column",
            margin: "0rem 1rem",
          }}
        >
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) => onDeliveryDateChange(e)}
              value={makeDetail.deliveryDate}
              id="issueDate"
              name="issueDate"
              label="Issue Date"
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider> */}
          <TextField
            disabled
            id="Issue Date"
            label="Issue Date"
            defaultValue={DateGenerator()}
            variant="outlined"
          />

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) => onDeliveryDateChange(e)}
              value={makeDetail.deliveryDate}
              id="deliveryDate"
              name="deliveryDate"
              label="Delivery Date "
              renderInput={(props) => <TextField {...props} />}
              variant="outlined"
            />
          </LocalizationProvider> */}
          <TextField
            onChange={(e) => onTextChange(e)}
            id="deliveryDate"
            name="deliveryDate"
            label="Delivery Date"
            variant="outlined"
          ></TextField>

          <TextField
            onChange={(e) => onTextChange(e)}
            id="deliveryAddress"
            name="deliveryAddress"
            label="Delivery Address"
            multiline
            maxRows={4}
            variant="outlined"
          ></TextField>
        </Box>
      </Box>
    </>
  );
};

export default Details;
