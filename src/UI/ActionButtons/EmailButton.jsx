import DownloadIcon from "@mui/icons-material/Download";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
const ActionButtons = styled(Button)`
  padding: 10px;
`;
const EmailButton = (props) => {
  return (
    <>
      <Box>
        <ActionButtons variant="contained" endIcon={<MailIcon />}>
          Mail the PDF
        </ActionButtons>
      </Box>
    </>
  );
};

export default EmailButton;
