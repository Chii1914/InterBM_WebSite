import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ category, selectedCategory, onCategorySelect, showAll }) => {
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
    { field: 'run', headerName: 'RUN', width: 150 }, 
    { field: 'nombre_completo', headerName: 'Nombre Completo', width: 250 }, 
    { field: 'categoria', headerName: 'Categoría', width: 150 }, 
  ];

  const cellStyle = {
    color: 'black',
    padding: '0 10px',
    backgroundColor: 'white'
  };

  return (
    <div style={{
      height: 400,
      width: '80%',
      margin: '20px auto',
      display: selectedCategory === category || showAll ? 'block' : 'none'
    }}>
      <DataGrid
        rows={data}
        columns={columns.map((column) => ({
          ...column,
          cellClassName: 'cell',
        }))}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.run}
        components={{
          Cell: ({ value, field }) => {
            return <div className="cell" style={cellStyle}>{value}</div>;
          },
        }}
      />
    </div>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(true);

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
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
        <button style={{ margin: '10px' }} onClick={() => { setSelectedCategory(null); setShowAll(true); }}>Mostrar Todos</button>
        {categories.map((category) => (
          <button key={category} style={{ margin: '10px' }} onClick={() => { setSelectedCategory(category); setShowAll(false); }}>{category}</button>
        ))}
      </div>

      {categories.map((category) => (
        <div key={category}>
          <DataTable
            category={category}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            showAll={showAll}
          />
        </div>
      ))}
    </div>
  );
};

export default App;
