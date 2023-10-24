import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Categorias = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const url = "/uservoucher/";
    axios
      .get(url)
      .then((response) => {
        setVouchers(response.data.usuarios);
      })
      .catch((error) =>
        console.error(
          "Hubo un error al cargar los datos de los vouchers:",
          error
        )
      );
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Run</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>categoria</TableCell>
              <TableCell>telefono de emergencia</TableCell>
              <TableCell>monto deuda</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(vouchers) && vouchers.length > 0 ? (
              vouchers.map((voucher, index) => (
                <TableRow key={index}>
                  <TableCell>{voucher.nombre_completo}</TableCell>
                  <TableCell>{voucher.run}</TableCell>
                  <TableCell>{voucher.direccion_completa}</TableCell>
                  <TableCell>{voucher.telefono}</TableCell>
                  <TableCell>{voucher.categoria}</TableCell>
                  <TableCell>{voucher.telefono_emergencia}</TableCell>
                  <TableCell>{voucher.monto}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {/* Esto es un comentario correcto en JSX */}
                <TableCell colSpan={3}>No se encontraron Vouchers</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Categorias;
