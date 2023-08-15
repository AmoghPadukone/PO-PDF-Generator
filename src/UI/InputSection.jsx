import { Box } from "@mui/material";
import React, { useState } from "react";
import Details from "../Inputs/Details";
import SecondaryInputs from "../Inputs/SecondaryInputs";
import Table from "../Inputs/Table";
import DownloadButton from "./ActionButtons/DownloadButton";
import EmailButton from "./ActionButtons/EmailButton";

const InputSection = (props) => {
  const [details, setDetails] = useState("");
  const [secondaryDetails, setSecondaryDetails] = useState("");
  const [tabledetails, setTableDetails] = useState("");

  const receivedDetails = (childState) => {
    setDetails(childState);
  };
  const receivedSecondaryDetails = (childState) => {
    setSecondaryDetails(childState);
  };
  const receivedTableDetails = (childState) => {
    setTableDetails(childState);
  };

  return (
    <>
      <Box
        sx={{
          border: "2px solid #000",
          padding: "2%  5%",
          paddingTop: "5%",
          marginBottom: "5%",
        }}
      >
        <Details details={receivedDetails} />
        <Table tableDetails={receivedTableDetails} />
        <SecondaryInputs secondaryDetails={receivedSecondaryDetails} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "3% ",
          }}
        >
          <DownloadButton
            details={details}
            tableDetails={tabledetails}
            secondaryDetails={secondaryDetails}
          />
          {/* <EmailButton /> */}
        </Box>
      </Box>
    </>
  );
};

export default InputSection;
