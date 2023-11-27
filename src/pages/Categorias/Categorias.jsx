import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ModalComponent from './ModalComponent';

// Función para convertir nombres de categoría
const formatCategoryName = (name) => {
  return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const DataTable = ({ category, selectedCategory, onCategorySelect, showAll }) => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Función para abrir el modal con los datos del usuario a editar
  const handleEdit = (user) => {
    setEditData(user);
    setOpenModal(true);
  };

  // Función para abrir el modal para añadir un nuevo usuario
  const handleAdd = () => {
    setEditData(null);
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para guardar los datos del usuario (añadir/editar)
  const saveUser = (userData) => {
    // Verificar si estamos editando un usuario existente o añadiendo uno nuevo
    const isEditingUser = data.some(user => user.run === userData.run);
  
    const endpoint = isEditingUser ? `http://localhost:4000/user/${userData.run}` : 'http://localhost:4000/user/';
    const method = isEditingUser ? 'patch' : 'post';
  
    axios[method](endpoint, userData)
      .then(response => {
        // Recargar los usuarios o actualizar el estado
        handleCloseModal();
      })
      .catch(error => {
        console.error("Error al guardar el usuario", error);
      });
  };
  
  const deleteUser = (userId) => {
    axios.delete(`http://localhost:4000/user/${userId}`)
      .then(response => {
        // Actualizar el estado para reflejar que el usuario ha sido eliminado
        setData(data.filter(user => user.run !== userId));
      })
      .catch(error => {
        console.error("Error al eliminar el usuario", error);
      });
  };

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
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEdit(params.row)}>Editar</button>
          <button onClick={() => deleteUser(params.row.run)}>Eliminar</button>
        </>
      ),
    },
  ];

  return (
    <div className={`data-table ${selectedCategory === category || showAll ? '' : 'hidden'}`}>
      <h2>{formatCategoryName(category)}</h2>
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
          Toolbar: () => (
            <div style={{ textAlign: 'right', padding: '10px' }}>
              <button onClick={handleAdd} style={{ padding: '5px 10px' }}>Añadir Usuario</button>
            </div>
          ),
        }}
      />
      {openModal && <ModalComponent userData={editData} onSave={saveUser} onClose={handleCloseModal} />}
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
        <button className="btn" onClick={() => { setSelectedCategory(null); setShowAll(true); }}>Mostrar Todos</button>
        {categories.map((category) => (
          <button key={category} className="btn" onClick={() => { setSelectedCategory(category); setShowAll(false); }}>{formatCategoryName(category)}</button>
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

const Categorias = () => (
  <>
    <style>{styles}</style>
    <App />
  </>
);

export default Categorias;
