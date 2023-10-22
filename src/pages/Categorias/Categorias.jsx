import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

// Componente DataTable para mostrar los datos de una categoría específica
const DataTable = ({ category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/usercat/${category}`)
      .then((response) => {
        setData(response.data.usuarios); 
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [category]);

  const columns = [
    { field: 'run', headerName: 'RUN', width: 130 },
    { field: 'nombre_completo', headerName: 'Nombre Completo', width: 200 },
    { field: 'categoria', headerName: 'Categoría', width: 150 },
    // Agrega más campos según sea necesario
  ];

  return (
    <div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
      <h2>{category}</h2>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.run} // Aquí se asigna el ID de cada fila
      />
    </div>
  );
};

// Componente principal que renderiza un DataTable para cada categoría
const App = () => {
  const categories = [
    "alevin",
    "mini_femenino",
    "mini_masculino",
    "infantil_femenino",
    "infantil_masculino",
    "cadete_femenino",
    "cadete_masculino",
    "juvenil_femenino",
    "juvenil_masculino",
    "adulto_femenino",
    "adulto_masculino",
  ];

  return (
    <div className="App">
      {categories.map((category) => (
        <DataTable key={category} category={category} />
      ))}
    </div>
  );
};

export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const Categorias = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('Todos');
  
//   const categories = ['Todos', 'juvenil', 'Categoria2', 'Categoria3', 'Categoria4', 'Categoria5', 'Categoria6', 'Categoria7'];

//   useEffect(() => {
//     let url =  `/usercat/juvenil`;  // URL por defecto para obtener todos los usuarios

//     if (selectedCategory !== 'Todos') {
//       // URL específica basada en la categoría seleccionada
     
//       url = `/usercat/juvenil`;
//     }
    
//     axios.get(url)
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => console.error('Hubo un error al cargar los datos de los usuarios:', error));
//   }, [selectedCategory]);
//   console.log(users)
//   return (
//     <div>
//       <label>
//         Categoría:
//         <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
//           {categories.map((category, index) => (
            
//             <option key={index} value={category}>{category}</option>
//           ))}
//         </select>
//       </label>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Nombre</TableCell>
//               <TableCell>Categoría</TableCell>
//               <TableCell>Dirección</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(users) ? users.map((user, index) => (  // Añadir una comprobación para asegurarse de que `users` es un array
              
            
//             <TableRow key={index}>
//                   <TableCell>{user.nombre}</TableCell>
//                   <TableCell>{user.categoria}</TableCell>
//                   <TableCell>{user.direccion}</TableCell>
//                 </TableRow>
//               )) : (
//                 <TableRow>
//                     {/* Esto es un comentario correcto en JSX */}
//                     <TableCell colSpan={3}>No se encontraron usuarios</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Categorias;
