import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getUsers,
  getUsersByRun,
  updateUser,
  createUser,
  deleteUser,
} from "../../../servicios/userService";

export default function BasicTable() {
  const [usuarios, setUsuarios] = useState([]);

  const traerUsuario = async () => {
    const getDePrueba = await getUsers();
    console.log(getDePrueba.usuarios);
    setUsuarios(getDePrueba.usuarios);
  };

  useEffect(() => {
    traerUsuario();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre Completo</TableCell>
            <TableCell align="Left">RUN</TableCell>
            <TableCell align="Left">Direccion </TableCell>
            <TableCell align="Left">Telefono de emergencia</TableCell>
            <TableCell align="Left">Deuda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuarios) => (
            <TableRow
              key={usuarios.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="Left">{usuarios.nombre_completo}</TableCell>
              <TableCell align="Left">{usuarios.run}</TableCell>
              <TableCell align="Left">{usuarios.direccion_completa}</TableCell>
              <TableCell align="Left">{usuarios.telefono}</TableCell>
              <TableCell align="Left">{usuarios.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
