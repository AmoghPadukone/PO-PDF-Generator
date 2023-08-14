import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const secondayDetails = {
  deliveryDate: "",
  deliveryAddress:
    "No.215, 7th cross, 2nd main road, 1st stage Indiranagar, Bengaluru–560038",
  paymentTerms: "",
  remark: "",
};
const SecondaryInputs = (props) => {
  const [makeSecondayDetails, setMakeSecondayDetails] =
    useState(secondayDetails);
  const onTextChange = (e) => {
    let changeSecondayDetails = {
      ...makeSecondayDetails,
      [e.target.name]: e.target.value,
    };
    setMakeSecondayDetails(changeSecondayDetails);
    props.secondaryDetails(makeSecondayDetails);
  };
  return (
    <>
      {" "}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            "& #deliveryAddress": { m: 1, width: "50ch" },
            "& #deliveryDate": { width: "20ch" },
            justifyContent: "space-between",
            margin: "0 5%",
          }}
        >
          <TextField
            onChange={(e) => onTextChange(e)}
            id="deliveryAddress"
            name="deliveryAddress"
            label="Delivery Address"
            // fullWidth
            multiline
            rows={2}
            maxRows={4}
            defaultValue={
              "No.215, 7th cross, 2nd main road, 1st stage Indiranagar, Bengaluru–560038"
            }
            variant="outlined"
          ></TextField>
          <TextField
            onChange={(e) => onTextChange(e)}
            id="deliveryDate"
            name="deliveryDate"
            label="Delivery Date"
            variant="outlined"
            placeholder="DD/MM/YYYY"
          ></TextField>
        </Box>
        <TextField
          sx={{ margin: "0 5%" }}
          onChange={(e) => onTextChange(e)}
          id="paymentTerms"
          name="paymentTerms"
          label="Payment terms"
          variant="outlined"
        ></TextField>
        <TextField
          sx={{ margin: "0 5%" }}
          onChange={(e) => onTextChange(e)}
          id="remark"
          name="remark"
          label="Remarks"
          variant="outlined"
        ></TextField>
      </Box>
    </>
  );
};

export default SecondaryInputs;
