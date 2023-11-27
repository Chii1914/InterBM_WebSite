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

const url = "/evento/mongo/";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const _id = randomId(); // Ensure this ID is unique
    // Create a new row with the structure matching your columns
    const newRow = {
      _id: _id,
      titulo: "",
      descripcion: "",
      organizador: "",
      localizacion: "",
      fecha_hora: new Date().toISOString(), // Set a default date or leave it empty
      isNew: true,
    };

    // Add the new row to the existing rows
    setRows((oldRows) => [...oldRows, newRow]);

    // Set the new row to be in edit mode
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: "titulo" }, // Adjust fieldToFocus as needed
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

  const handleSaveClick = (_id) => () => {
    const updatedRow = rows.find((row) => row._id === _id);
    if (!updatedRow) {
      return;
    }
    setRowModesModel({ ...rowModesModel, [_id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (_id) => async () => {
    try {
      await axios.delete(url + _id);
      // Update the rows state to reflect the deletion
      setRows((currentRows) => currentRows.filter((row) => row._id !== _id));
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
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

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      if (url === "/evento/mongo/") {
        try {
          const { _id, ...newObjectWithoutId } = newRow;
          const response = await axios.post(url, newObjectWithoutId);
          const updatedRow = {
            ...response.data.evento,
            _id: response.data.evento._id,
          };
          setRows((prevRows) =>
            prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
          );
          return updatedRow;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(url, newRow);
          console.log(response.data.evento)
          const updatedRow = {
            ...response.data.evento,
            _id: response.data.evento._id,
          };
          setRows((prevRows) =>
            prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
          );
          console.log(updatedRow)
          return updatedRow;
        } catch (error) {
          console.log(error);
        }
      }
    }

    try {
      //Manda la wea al backend y espera la respuesta
      const response = await axios.patch(url + newRow._id, newRow);
      const updatedRow = {
        ...response.data.evento,
        _id: response.data.evento._id,
      };

      //Seteo de row en el front
      setRows((prevRows) =>
        prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
      );
      return updatedRow;
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Error updating row:", error);
      throw new Error("Failed to update row in backend.");
    }
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
      field: "localizacion",
      headerName: "Dirección",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "fecha_hora",
      headerName: "Fecha",
      type: "dateTime",
      width: 180,
      editable: true,
      valueGetter: (params) => {
        // Assuming the timestamp is in milliseconds
        return new Date(params.value);
      },
      valueFormatter: (params) => {
        // Format the date for SQL Server datetime compatibility
        const date = params.value;
        const formattedDate =
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0");
        const formattedTime =
          String(date.getHours()).padStart(2, "0") +
          ":" +
          String(date.getMinutes()).padStart(2, "0") +
          ":" +
          String(date.getSeconds()).padStart(2, "0");
        return formattedDate + " " + formattedTime;
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
