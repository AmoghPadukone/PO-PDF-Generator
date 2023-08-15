import DownloadIcon from "@mui/icons-material/Download";
import MailIcon from "@mui/icons-material/Mail";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import transStamp from "../../assets/stamp-transperant.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import React, { useState } from "react";
const ActionButtons = styled(Button)`
  padding: 10px 40px;
  font-size: 16px;
  color: black;
  background-color: white;
  border: 1px solid black;
  &:hover {
    // box-shadow: 5px 5px rgb(0, 0, 0);
    box-shadow: none;
    background-color: #f2f2f2;
    border: 1px solid #000;
    font-size: 16px;
  }
  // &:active {
  //   background-color: #3785;
  //   box-shadow: none;
  //   transform: translate(5px, 5px);
  //   //   transform: scale(.9),
  //   transition: ease 300s;
  //   border: 2px solid #000;
  // }
`;

// console.log("Details: ", props.details);
// console.log("Table Details: ", props.tableDetails);

const DownloadButton = (props) => {
  const tableDetailsUnformatted = props.tableDetails;
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const calculateSubtotalAmount = (data) => {
    let subtotalAmount = 0;
    for (const item of data) {
      const qty = item.qty || 0;
      const rate = item.rate || 0;
      subtotalAmount += qty * rate;
    }

    return subtotalAmount;
  };

  const subtotalAmount = calculateSubtotalAmount(props.tableDetails);

  // const subtotalAmount = calculateSubtotalAmount()
  const calculateGSTAmount = (amount) => {
    let gstAmount = amount * 0.18;

    return gstAmount;
  };

  const gstAmount = calculateGSTAmount(subtotalAmount);

  const tableDetailsformatted = Object.values(props.tableDetails).map(
    (item, index) => ({
      ...item,
      slNo: index + 1,
      amount: currencyFormatter.format(item.rate * item.qty),
      rate: currencyFormatter.format(item.rate),
    })
  );

  //table code

  const generateTable = (data) => {
    if (data.length === 0) {
      // console.error("Data array is empty.");
      return;
    }
    const keys = Object.keys(data[0]);
    const columns = keys.filter((element) =>
      ["slNo", "itemDesc", "rate", "qty", "amount"].includes(element)
    );

    const headerColumns = [
      "Sl No.",
      "Item Description",
      "Rate",
      "Qty",
      "Amount",
    ];
    const headerColumnAlignments = {
      "Sl No.": "center",
      "Item Description": "center",
      Rate: "left",
      Qty: "left",
      Amount: "left",
    };

    const columnAlignments = {
      slNo: "center",
      itemDesc: "center",
      rate: "right",
      qty: "center",
      amount: "right",
    };

    const tableBody = data.map((item) => {
      return columns.map((col) => {
        return { text: item[col].toString(), alignment: columnAlignments[col] };
      });
    });
    return {
      table: {
        headerRows: 1,
        widths: [40, 140, 70, 50, "auto", 100],
        body: [
          headerColumns.map((col) => ({
            text: col,
            bold: true,
            alignment: headerColumnAlignments[col],
            fillColor: "#bfbfbf",
          })),
          ...tableBody,
          ["", "", "", "    ", ""],
          [
            "",
            "",
            "Sub total",
            "",
            `${currencyFormatter.format(subtotalAmount)}`,
          ],
          ["", "", "GST@ 18%", "", `${currencyFormatter.format(gstAmount)}`],
          ["", "", "", "    ", ""],
          [
            "",
            "",
            "Grand total",
            "",
            `${currencyFormatter.format(subtotalAmount + gstAmount)}`,
          ],
        ],
      },
      margin: [40, 20, 10, 10],
      fontSize: 10,

      // alignment: "center",
    };
  };

  function line() {
    return {
      table: {
        headerRows: 1,
        widths: ["100%"],
        body: [[""], [""]],
      },
      layout: "headerLineOnly",
    };
  }
  const DateGenerator = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;
  };
  const docDefinition = {
    pageSize: "A4",

    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [55, 20, 65, 50],
    content: [
      {
        image:
          "data:image/png;base64,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",
        alignment: "center",
      },
      // {
      //   canvas: getCanvasLine(),
      // },
      line(),
      {
        text: "No.215, 7th cross, 2nd main road, 1st stage Indiranagar, Bengaluru – 560038",
        margin: [0, 10, 0, 0],
        alignment: "center",
      },
      {
        text: "GST# 29AAGCG3848R1ZP",
        margin: [0, 5, 0, 10],
        alignment: "center",
      },
      // {
      //   canvas: getCanvasLine(),
      // },
      line(),
      {
        columns: [
          {
            text: `PO No. - ${props.details.poNo}`,
            bold: true,
          },
          {
            text: `Lead No. - ${props.details.poNo}`,
            bold: true,
          },
          {
            text: `Issue Date - ${DateGenerator()}`,
            bold: true,
          },
        ],
        margin: [15, 10, -30, 0],
        fontSize: 10,
      },
      {
        text: `Program name - ${props.details.programName}`,
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },
      {
        text: `Category - ${props.details.category}`,
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },
      {
        text: `Vendor Name ${props.details.vendorName}`,
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },
      {
        text: `Contact Person - ${props.details.contactPerson}`,
        // text: [
        //   { text: "Contact Person: ", bold: true, style: "header" },
        //   { text: `${props.details.contactPerson}` },
        // ],
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },
      {
        text: `Phone - ${props.details.phone}`,
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },
      {
        text: `GST No - ${props.details.gstNo}`,
        bold: true,
        fontSize: 10,
        margin: [15, 4, 0, 0],
      },

      // {
      //   table: {
      //     // headers are automatically repeated if the table spans over multiple pages
      //     // you can declare how many rows should be treated as headers
      //     headerRows: 1,
      //     widths: [45, 175, 50, "auto", 100],

      //     body: [
      //       ["Sl No", "Item Description", "Rate", "Qty", "Amount"],
      //       ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5"],
      //       [
      //         { text: "Bold value", bold: true },
      //         "Val 2",
      //         "Val 3",
      //         "Val 4",
      //         "Val 4",
      //       ],
      //     ],
      //   },
      //   margin: [10, 20, 10, 10],
      //   alignment: "center",
      // },
      generateTable(tableDetailsformatted),
      {
        text: `Delivery Date - ${props.secondaryDetails.deliveryDate}`,
        margin: [15, 4, 0, 0],
        bold: "true",
        fontSize: 10,
      },
      {
        text: `Delivery Address - ${props.secondaryDetails.deliveryAddress}`,
        margin: [15, 4, 0, 0],
        bold: "true",
        noWrap: true,
        fontSize: 10,
      },
      {
        text: `Payment Terms - ${props.secondaryDetails.paymentTerms}`,
        margin: [15, 4, 0, 0],
        bold: "true",
        fontSize: 10,
      },
      {
        text: `Remarks - ${props.secondaryDetails.remark}`,
        margin: [15, 4, 0, 0],
        bold: "true",
        fontSize: 10,
      },
      {
        image:
          "data:image/png;base64,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",
        alignment: "right",
        width: 80,
        margin: [0, 10, 0, 20],
      },
      {
        text: "Annexure: General Terms & Conditions",
        style: "tcHeader",
      },
      {
        text: "1) Prices and Delivery Schedule:",
        style: "tcSubheader",
      },
      {
        text: [
          "   a) Payments shall be released only for the services accepted by the Company as per the Payments terms mutually agreed to in the purchase order.\n",
          "b) Company declines all responsibility of payment where proof of delivery affected cannot be given satisfactorily by the Supplier.\n",
          "c) The delivery of products by the supplier to the Company will not constitute acceptance of the said products by the Company. Acceptance of the products will be completed and communicated only after inspection and satisfactory testing of the products by the Company. Till acceptance of the products by the Company the products shall remain with the Company on supplier's account on approval basis only. The risk of loss or damage to the product passes to the Company upon the acceptance of the products by the Company.\n",
          "d) The Company reserves the right to reject if further defects are noticed even if in the first instance the products have been accepted by the Company and are paid for. Company's decision about such rejections at whatever time made shall be final and binding upon the supplier.\n",
          "e) If the products are not approved by the Company for any reason whatsoever the Company shall not be liable to pay any sum on account of such rejected products.\n",
          "f) The Company reserves the right to cancel or amend the order or any part thereof for the following reasons: \n (i) irregularities in supply\n (ii) rejections\n (iii)escalation in prices\n(iv) if the supplier fails to fulfil his obligation as per the order without assigning any reason. Company's decision shall be final in disputes arising out of Purchase orders. Money due to the Company either as damages or under any other order may be adjusted when settling payments against this order.\n",
          "g) The Company assumes no obligations to products delivered in excess of those specifically ordered. Purchase Order number should be stated on the Challan and Invoice as otherwise material will not be accepted.\n",
          "h) The invoice must be submitted in duplicate to the Company's respective office. Purchase order number, Date and Supplier's Delivery note no. must appear on the Invoice. The Invoice not fulfilling this requirement will be returned.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
      //2nd point

      {
        text: "2. Payments:",
        style: "tcSubheader",
      },
      {
        text: [
          " The confirmation of this purchase order shall be in writing within 7 (seven) days of the date on the order.\n",
          " a) If the purchase order is not accepted within7(seven) days, CSESPL(hereinafter called Company shall be at liberty to cancel the same without incurring any liability whatsoever.\n",
          "b) The Company shall not be liable and/or responsible for any purchase order placed by unauthorized persons of Company.\n",
          "c) Prices, terms and conditions mentioned on the purchase order will be taken as firm and cannot be changed, altered or modified during the period of contract. After the acceptance of the Purchase Order, no changes shall be made without an order amendment. Any modifications of these terms and conditions must be in writing and with mutual consent.\n",
          "d) It is clearly understood between the parties that time of delivery of the product is the essence of this order. Therefore, all the material of this order should be supplied as per the directions specified on the order within the time specified therein, or as communicated by Operations department by separate delivery schedule. The non-delivery of the product at the specified time shall be construed as the breach of material obligation by the supplier.\n",
          "e) If the order is not executed within the specified period, it may be treated as cancelled. In such an event, the Company may buy such material from the open market for keeping the company's target delivery in time. The Supplier shall make good the loss or damages suffered by the Company.\n",
          "f) The company reserves the right to have their representative monitor supplier's production process, testing facilities, access to workshops where the ordered components are being produced and to inspect the ordered components in its premises.\n",
          " g) The Supplier may, after written consent from the Company sub-contract the production of any part of the order and gives to the sub-contractor such information as is necessary for this purpose. The Subcontractor shall be bound by the confidentiality clause as set in this order. The Supplier shall remain directly liable and responsible to the company for the performance, acts and omissions of the sub-contractors.\n",
          "h) The supplier shall maintain the records of production and Quality control activities.\n",
          " i) The supplier shall immediately take countermeasures whenever a quality problem is reported and shall inform Company in the prescribed time.\n",
          "j) In case of conflict between the terms of this Order or the Basic Purchase Agreement or Rate Contract as the case it may be, the terms of the Basic Purchase Agreement shall prevail.\n",
        ],
        style: "tcPoints",
        bold: false,
      },

      //3rd point
      {
        text: "3. Damage to third person / property:",
        style: "tcSubheader",
      },
      {
        text: [
          " The Supplier agrees to indemnify, defend and hold harmless the Company, employees , successors and assigns from and against any losses, damages, claims, fines, penalties and expenses (including reasonable attorney's fees and court costs) that arise out of or result from:\n",
          "(1) injuries or death to persons or damage to property in any way arising out of or caused by services performed by, or material provided by Supplier or persons furnished by Supplier;\n",
          "(2) assertions under Workers' Compensation or similar acts made by persons furnished by Supplier or\n",
          "(3) any failure of Supplier to perform its obligations under this order.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
      //4th point
      {
        text: "4. Force Majeure:",
        style: "tcSubheader",
      },
      {
        text: [
          "a) Neither supplier nor Company shall be held responsible for any delay or failure in performance of any part of this order to the extent such delay or failure is caused by fire, flood, strike, civil, governmental or military authority, act of God, beyond its control and without the fault or negligence of the delayed or non-performing party or its subcontractors. Supplier's liability for loss or damage to Company's material in Supplier's possession or control shall not be modified by this clause.\n",
          "b) In the event such delay or non-performance continues for a period of at least sixty (60) days, the non-defaulting party may terminate, at no charge, this Order by giving notice to that effect.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
      //5th point
      {
        text: "5. Arbitration:",
        style: "tcSubheader",
      },
      {
        text: [
          "a) Any differences or disputes arising out of or in connection with this order shall be settled by an amicable effort on the part of both parties. An attempt to arrive at a settlement shall be deemed to have failed as soon as one of the parties to this Order so notifies to the other party in writing.\n",
          "b) If an attempt at settlement has failed, the disputes or differences arising out of or in connection with the present order shall be finally settled in accordance with the Indian Arbitration and Conciliation Act 1996 (Act) as amended from time to time by sole arbitrator appointed by the Company in accordance with the Act. The decision of such arbitrator shall be final and binding up on each of the parties hereto.\n",
          "c) The place of arbitration shall be Bangalore, India.\n",
          "d) When any dispute is under arbitration, except for the matter under dispute the parties shall continue to exercise their remaining respective obligations under this agreement.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
      //6th point
      {
        text: "6. Ethics and Code of Conduct:",
        style: "tcSubheader",
      },
      {
        text: [
          "a) The Business Associate (or Name of party signing contract) agrees to conduct all its dealings with CSESPL, its management, employees and other business associates, in a very ethical manner.\n",
          "b) CSESPL in its Code of Conduct strictly prohibits its employees from demanding / accepting or payment of illegal gratification in the form of bribes or kickbacks either in cash or in kind in the course of all their dealings with outside parties.\n",
          "c) CSESPL also requires the Business Associate, to refrain from giving or attempting to pay illegal gratification / bribes / kickbacks to any employee of the company. Any attempts to provide such personal gratification to any CSESPL employee will be viewed in a very serious manner and where there is confirmation of such instances, it may lead to : Cessation of all business dealings with CSESPL, Blacklisting with CSESPL and its associates for any future business, Levy of a financial penalty, Reporting of matter to law enforcement agencies, Appropriate legal action, where necessary.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
      //7th point
      {
        text: "7. Governing Law:",
        style: "tcSubheader",
      },
      {
        text: [
          " This Order shall be governed by and construed in accordance with the laws of India, excluding any conflict of Law provision that would require the application of Laws of any other jurisdiction. The courts at Bangalore shall have the exclusive jurisdiction.\n",
        ],
        style: "tcPoints",
        bold: false,
      },
    ],

    styles: {
      tableHeader: {
        fillColor: "#cccccc",
      },
      tcHeader: {
        fontSize: 10,
        bold: true,
      },
      tcSubheader: {
        fontSize: 8,
        bold: true,
      },
      tcPoints: {
        fontSize: 7,
      },
      defaultStyle: {
        font: "Calibri",
        fontSize: 10,
      },
    },
  };

  const handleDownload = () => {
    console.log("Details: ", props.details);
    console.log("Table Details: ", props.tableDetails);
    // pdfMake.createPdf(docDefinition).download();
    pdfMake.createPdf(docDefinition).open();
  };
  return (
    <>
      <Box>
        <ActionButtons
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download PO PDF
        </ActionButtons>
      </Box>
    </>
  );
};

export default DownloadButton;
