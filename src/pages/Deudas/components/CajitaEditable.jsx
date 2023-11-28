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
import { randomId } from "@mui/x-data-grid-generator";

const url = "/uservoucher/";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id_boleta = randomId(); // Ensure this ID is unique
    // Create a new row with the structure matching your columns
    const newRow = {
      id_boleta: id_boleta,
      run: "",
      descripcion: "",
      organizador: "",
      localizacion: "",
      isNew: true,
    };

    // Add the new row to the existing rows
    setRows((oldRows) => [...oldRows, newRow]);

    // Set the new row to be in edit mode
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id_boleta]: { mode: GridRowModes.Edit, fieldToFocus: "titulo" }, // Adjust fieldToFocus as needed
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
        // Asegúrate de que los datos de la API coincidan con la estructura de las columnas
        const formattedData = response.data.usuarios.map((item) => ({
          id_boleta: item.id_boleta,
          name: item.nombre_completo,
          run: item.run,
          categorias: item.categoria,
          marzo: item.monto,
          abril: item.monto,
          mayo: item.monto,
          junio: item.monto,
          julio: item.monto,
          agosto: item.monto,
          septiembre: item.monto,
          octubre: item.monto,
          noviembre: item.monto,
          diciembre: item.monto,
          total: item.monto,
        }));
        setRows(formattedData);
        console.log(formattedData);
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

  const handleEditClick = (id_boleta) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id_boleta]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (id_boleta) => () => {
    const updatedRow = rows.find((row) => row.id_boleta === id_boleta);
    if (!updatedRow) {
      return;
    }
    setRowModesModel({
      ...rowModesModel,
      [id_boleta]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (id_boleta) => async () => {
    try {
      await axios.delete(url + id_boleta);
      // Update the rows state to reflect the deletion
      setRows((currentRows) =>
        currentRows.filter((row) => row.id_boleta !== id_boleta)
      );
    } catch (error) {
      console.error("Error al eliminar usuario", error);
    }
  };

  const handleCancelClick = (id_boleta) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id_boleta]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id_boleta === id_boleta);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id_boleta !== id_boleta));
    }
  };

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      if (url === "/uservoucher/") {
        try {
          const { id_boleta, ...newObjectWithoutId } = newRow;
          const response = await axios.post(url, newObjectWithoutId);
          const updatedRow = {
            ...response.data.usuarios,
            id_boleta: response.data.usuarios.id_boleta,
          };
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id_boleta === newRow.id_boleta ? updatedRow : row
            )
          );
          return updatedRow;
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(url, newRow);
          console.log(response.data.boleta);
          const updatedRow = {
            ...response.data.boleta,
            id_boleta: response.data.boleta.id_boleta,
          };
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id_boleta === newRow.id_boleta ? updatedRow : row
            )
          );
          console.log(updatedRow);
          return updatedRow;
        } catch (error) {
          console.log(error);
        }
      }
    }

    try {
      //Manda la wea al backend y espera la respuesta
      const response = await axios.patch(url + newRow.id_boleta, newRow);
      const updatedRow = {
        ...response.data.boleta,
        id_boleta: response.data.boleta.id_boleta,
      };

      //Seteo de row en el front
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id_boleta === newRow.id_boleta ? updatedRow : row
        )
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
    { field: "name", headerName: "Nombre", width: 180, editable: true },
    {
      field: "run",
      headerName: "Run",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "categorias",
      headerName: "Categoria",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "marzo",
      headerName: "Marzo",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "abril",
      headerName: "Abril",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mayo",
      headerName: "Mayo",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "junio",
      headerName: "Junio",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "julio",
      headerName: "Julio",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "agosto",
      headerName: "Agosto",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "septiembre",
      headerName: "Septiembre",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "octubre",
      headerName: "Octubre",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "noviembre",
      headerName: "Noviembre",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "diciembre",
      headerName: "Diciembre",
      type: "number",
      width: 90,
      editable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "total",
      headerName: "Deuda total",
      type: "number",
      width: 150,
      editable: true,
      headerAlign: "left",
      align: "left",
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id_boleta: id_boleta }) => {
        const isInEditMode =
          rowModesModel[id_boleta]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id_boleta)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id_boleta)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id_boleta)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id_boleta)}
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
        getRowId={(row) => row.id_boleta}
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
