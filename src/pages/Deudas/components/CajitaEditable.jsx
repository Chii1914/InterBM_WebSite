import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export default function BasicEditingGrid() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const url = "/uservoucher/";
    axios
      .get(url)
      .then((response) => {
        const transformedData = response.data.usuarios.map((user, index) => ({
          id: user.id || index,
          name: user.nombre_completo,
          run: user.run,
          categorias: user.categoria,
          marzo: user.monto,
          abril: user.monto,
          mayo: user.monto,
          junio: user.monto,
          julio: user.monto,
          agosto: user.monto,
          septiembre: user.monto,
          octubre: user.monto,
          noviembre: user.monto,
          diciembre: user.monto,
          total: user.monto,
        }));
        setVouchers(transformedData);
      })
      .catch((error) =>
        console.error(
          "Hubo un error al cargar los datos de los vouchers:",
          error
        )
      );
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid rows={vouchers} columns={columns} />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Nombre", width: 180, editable: false },
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
];
