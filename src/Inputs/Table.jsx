import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  randomArrayItem,
  randomCreatedDate,
  randomId,
  randomTraderName,
} from "@mui/x-data-grid-generator";
import * as React from "react";

// const initialRows = [
//   // {
//   //   id: randomId(),
//   //   slno: "",
//   //   itemDesc: "",
//   //   rate: "",
//   //   qty: "",
//   //   amount: "",
//   // },
// ];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [slNoState, setSlNoState] = useState(1);

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        slNo: "",
        itemDesc: "",
        rate: "",
        qty: "",
        amount: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "itemDesc" },
    }));
    setSlNoState(slNoState + 1);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Table(props) {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    // Call the callback function with updated state whenever childState changes

    props.tableDetails(rows);
  }, [rows, props]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, params) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const updatedRows = rows.map((row) =>
      row.id === id ? processRowUpdate(row, params) : row
    );
    setRows(updatedRows);
    console.log("saved row: ", rows);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setRows((prevRows) =>
      prevRows.map((row, index) => ({
        ...row,
        slNo: index + 1,
      }))
    );
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow, params) => {
    const updatedRow = { ...newRow, isNew: false };
    // const updatedData = { ...rows };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getAmount = (params) => {
    const rate = params.row.rate || 0; // If rate is empty or undefined, assume it as 0
    const qty = params.row.qty || 0; // If qty is empty or undefined, assume it as 0
    return rate * qty;
  };

  //currency formatter
  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const inrPrice = {
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
  };

  const columns = [
    {
      field: "slNo",
      headerName: "Sl No.",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },

    {
      field: "itemDesc",
      headerName: "Item Description",
      width: 300,
      editable: true,
    },

    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 120,
      editable: true,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      cellClassName: "font-tabular-nums",
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 220,
      valueGetter: getAmount,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
      cellClassName: "font-tabular-nums",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "90%",
        margin: "5% auto",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        hideFooterPagination
        hideFooter
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
