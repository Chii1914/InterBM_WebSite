import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";

const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const url = "/evento/mongo";
    axios
      .get(url)
      .then((response) => {
        setRows(response.data.evento);
      })
      .catch((error) =>
        console.error(
          "Hubo un error al cargar los datos de los vouchers:",
          error
        )
      );
  }, []);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (_id) => () => {
    setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (_id) => async () => {
    const rowToUpdate = rows.find((row) => row._id === _id);

    if (!rowToUpdate) {
      console.error("Row not found!");
      return;
    }

    const url = `/evento/mongo/${_id}`;

    try {
      const response = await axios.patch(url, rowToUpdate);
      console.log("API response:", response);

      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row._id === _id ? { ...rowToUpdate, ...response.data } : row
        );
        return updatedRows;
      });

      setRowModesModel((prevModel) => ({
        ...prevModel,
        [_id]: { mode: GridRowModes.View },
      }));
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const handleDeleteClick = (_id) => () => {
    setRows(rows.filter((row) => row.id !== _id));
  };

  const handleCancelClick = (_id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [_id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === _id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== _id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "titulo", headerName: "Título", width: 180, editable: true },
    {
      field: "descripcion",
      headerName: "Descripción",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "organizador",
      headerName: "Organizador",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "nombre",
      headerName: "nombre",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "timestamp",
      headerName: "Fecha",
      type: "dateTime",
      width: 180,
      editable: true,
      valueGetter: (params) => {
        // Assuming the timestamp is in milliseconds
        return new Date(params.value);
      },
      valueFormatter: (params) => {
        // Format the date for display
        return (
          params.value.toLocaleDateString() +
          " " +
          params.value.toLocaleTimeString()
        );
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id: _id }) => {
        const isInEditMode = rowModesModel[_id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(_id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(_id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(_id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(_id)}
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
        width: "100%",
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
        getRowId={(row) => row._id}
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
