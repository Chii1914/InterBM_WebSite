import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

// Función para convertir nombres de categoría
const formatCategoryName = (name) => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const DataTable = ({
  category,
  selectedCategory,
  onCategorySelect,
  showAll,
}) => {
  const [data, setData] = useState([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    run: '',
    nombre_completo: '',
    categoria: '',
  });
  const [editedUserData, setEditedUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/usercat/${category}`)
      .then((response) => {
        setData(response.data.usuarios);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, [category]);

  const columns = [
    { field: 'run', headerName: 'RUN', width: 150 },
    { field: 'nombre_completo', headerName: 'Nombre Completo', width: 250 },
    { field: 'categoria', headerName: 'Categoría', width: 150 },
  ];

  const handleDelete = (run) => {
    axios
      .delete(`http://localhost:4000/user/${run}`)
      .then(() => {
        setData((prevData) => prevData.filter((user) => user.run !== run));
      })
      .catch((error) => {
        console.error('Error al eliminar usuario', error);
      });
  };

  const handleCellEditCommit = async (params) => {
    try {
      const updatedData = data.map((row) => {
        if (row.id === params.id) {
          return { ...row, [params.field]: params.value };
        }
        return row;
      });
      setData(updatedData);
      await axios.patch(`http://localhost:4000/user/${params.row.run}`, { [params.field]: params.value });
    } catch (error) {
      console.error('Error al actualizar usuario', error);
      // Revertir cambios en el estado si la actualización falla
      setData(data);
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
    setIsEditingUser(false);
    setEditedUserData(null);
  };

  const handleEditUserClick = (user) => {
    setIsAddingUser(false);
    setIsEditingUser(true);
    setEditedUserData(user);
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
    setIsEditingUser(false);
    setEditedUserData(null);
  };

  const handleAddUserSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/user/', newUserData);
      if (response.data.status) {
        // Agregar el usuario al estado si es necesario
        // Por ejemplo, si mantienes una lista de usuarios en el estado
        setData((prevData) => [...prevData, response.data.usuario]);
        // Limpiar los datos del nuevo usuario
        setNewUserData({
          run: '',
          nombre_completo: '',
          categoria: '',
        });
        // Cerrar el modal de agregar usuario
        setIsAddingUser(false);
      }
      // Manejar otras acciones como cerrar el modal de agregar usuario, etc.
    } catch (error) {
      console.error('Error al agregar usuario', error);
      // Mostrar mensaje de error al usuario si es necesario
    }
  };

  // When submitting the edit user form, ensure the category is correctly formatted or validated
  const handleEditUserSubmit = () => {
    // The category should be validated or transformed if necessary
    const validCategory = formatCategoryName(editedUserData.categoria);

    axios
      .patch(`http://localhost:4000/user/${editedUserData.run}`, { ...editedUserData, categoria: validCategory })
      .then(() => {
        // Ensure the data is updated correctly in the state
        setData((prevData) =>
          prevData.map((user) =>
            user.run === editedUserData.run ? { ...editedUserData, categoria: validCategory } : user
          )
        );
        setIsEditingUser(false);
        setEditedUserData(null);
      })
      .catch((error) => {
        console.error('Error al editar usuario', error);
      });
  };

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
        onCellEditCommit={handleCellEditCommit}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
      />
      {isAddingUser || isEditingUser ? (
        <div className="add-user-modal" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h3>{isEditingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h3>
          <input
            type="text"
            placeholder="RUN"
            value={isEditingUser ? editedUserData.run : newUserData.run}
            onChange={(e) =>
              isEditingUser
                ? setEditedUserData({ ...editedUserData, run: e.target.value })
                : setNewUserData({ ...newUserData, run: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Nombre Completo"
            value={isEditingUser ? editedUserData.nombre_completo : newUserData.nombre_completo}
            onChange={(e) =>
              isEditingUser
                ? setEditedUserData({ ...editedUserData, nombre_completo: e.target.value })
                : setNewUserData({ ...newUserData, nombre_completo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Categoría"
            value={isEditingUser ? editedUserData.categoria : newUserData.categoria}
            onChange={(e) =>
              isEditingUser
                ? setEditedUserData({ ...editedUserData, categoria: e.target.value })
                : setNewUserData({ ...newUserData, categoria: e.target.value })
            }
          />
          <button onClick={isEditingUser ? handleEditUserSubmit : handleAddUserSubmit}>
            {isEditingUser ? 'Guardar' : 'Agregar'}
          </button>
          <button onClick={handleCancelAddUser}>Cancelar</button>
        </div>
      ) : (
        <button className="add-button" onClick={handleAddUserClick}>
          Agregar Usuario
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(true);

  const categories = [
    'alevin',
    'mini_femenino',
    'mini_masculino',
    'infantil_femenino',
    'infantil_masculino',
    'cadete_femenino',
    'cadete_masculino',
    'juvenil_femenino',
    'juvenil_masculino',
    'adulto_femenino',
    'adulto_masculino',
  ];

  return (
    <div className="App">
      <div className="category-buttons">
        <button className="btn" onClick={() => { setSelectedCategory(null); setShowAll(true); }}>Mostrar Todos</button>
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
  margin: 20px auto 50px; 
}

.hidden {
  display: none;
}

.add-button {
  margin-top: 10px;
  margin-bottom: 20px; /* Margen inferior agregado */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #000;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: green;
}

.add-user-modal {
  // ... (Estilos anteriores)
}

.add-user-modal h3 {
  // ... (Estilos anteriores)
}

.add-user-modal input {
  // ... (Estilos anteriores)
}

.add-user-modal button {
  // ... (Estilos anteriores)
}
`;

export default () => (
  <>
    <style>{styles}</style>
    <App />
  </>
);

