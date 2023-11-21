import { React, useState, useEffect } from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import ReactDOM from "react-dom";
import axios from "axios";

const columns = [
  "Id",
  "Descripción",
  "Título",
  "Localización",
  "Organizador",
  "Fecha_hora",
];

function Eventos() {
  const [eventos, setData] = useState([]);

  useEffect(() => {
    const url = "/evento";
    axios
      .get(url)
      .then((response) => {
        setData(response.data.eventos);
      })
      .catch((error) =>
        console.error(
          "Hubo un error al cargar los datos de los eventos:",
          error
        )
      );
  }, []);
  

  const options = {
    filterType: "dropdown",
    responsive: "stacked",
  };

  return (
    <PageContainer title="Gestor de eventos" description="Gestión de eventos">
      <MUIDataTable
        title={"Eventos InterBM"}
        data={eventos}
        columns={columns}
        options={options}
      />
    </PageContainer>
  );
}

export default Eventos;


/*
const result = [];
  if (!(eventos.length === 0)) {
    for (var i in eventos) {
      result.push([i, eventos[i].descripcion, eventos[i].titulo, eventos[i].localizacion, eventos[i].organizador, eventos[i].fecha_hora]);
    }
    console.log(result);
  }
  */