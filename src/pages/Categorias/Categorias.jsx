import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

// Función para convertir nombres de categoría
const formatCategoryName = (name) => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DataTable = ({
  category,
  selectedCategory,
  onCategorySelect,
  showAll,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/usercat/${category}`)
      .then((response) => {
        setData(response.data.usuarios);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [category]);

  const columns = [
    { field: "run", headerName: "RUN", width: 150 },
    { field: "nombre_completo", headerName: "Nombre Completo", width: 250 },
    { field: "categoria", headerName: "Categoría", width: 150 },
  ];

  return (
    <div
      className={`data-table ${
        selectedCategory === category || showAll ? "" : "hidden"
      }`}
    >
      <h2>{formatCategoryName(category)}</h2>
      <DataGrid
        rows={data}
        columns={columns.map((column) => ({
          ...column,
          cellClassName: "cell",
        }))}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row.run}
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
      <div className="category-buttons">
        <button
          className="btn"
          onClick={() => {
            setSelectedCategory(null);
            setShowAll(true);
          }}
        >
          Mostrar Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="btn"
            onClick={() => {
              setSelectedCategory(category);
              setShowAll(false);
            }}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>
      {categories.map((category) => (
        <DataTable
          key={category}
          category={category}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          showAll={showAll}
        />
      ))}
    </div>
  );
};

const styles = `
.App {
  font-family: Arial, sans-serif;
}

.category-buttons {
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: red;
}

.data-table {
  height: 400px;
  width: 80%;
  margin: 20px auto;
}

.hidden {
  display: none;
}

.cell {
  color: black;
  padding: 0 10px;
  
}
`;

export default () => (
  <>
    <style>{styles}</style>
    <App />
  </>
);
