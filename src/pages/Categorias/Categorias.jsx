import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Categorias = () => {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'juvenil', 'Categoria2', 'Categoria3', 'Categoria4', 'Categoria5', 'Categoria6', 'Categoria7'];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    let url = '/usercat/' + selectedCategory;
    if (selectedCategory === 'Todos') url = '/user/';
    console.log(url); // URL por defecto para obtener todos los usuarios
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data.usuarios);
      })
      .catch((error) => console.error('Hubo un error al cargar los datos de los usuarios:', error))
  }, [selectedCategory]);
  console.log(users.usuarios);

  return (
    <div>
      <label>
        Categoría:
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) ? (
              users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.nombre_completo}</TableCell>
                  <TableCell>{user.categoria}</TableCell>
                  <TableCell>{user.direccion_completa}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {/* Esto es un comentario correcto en JSX */}
                <TableCell colSpan={3}>No se encontraron usuarios</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Categorias;