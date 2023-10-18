// Categorias.jsx
import React, { useState, useEffect } from "react";

function CategoriasPage() {
  const [data, setData] = useState({ categories: [], users: [] });

  useEffect(() => {
    fetch('http://localhost:4000/users/categories')  // Asegúrate de actualizar la URL según tu configuración
      .then(res => res.json())
      .then(data => {
        setData({
          categories: data.categories,
          users: data.users
        });
      })
      .catch(error => console.log(error));
  }, []);

  // Aquí puedes añadir la lógica para mostrar los datos cargados, por ejemplo, mapear a través de data.users y data.categories para mostrarlos en la UI

  return (
    <div>
      <h1>Categorías y Usuarios</h1>
      {/* Aquí va tu código para mostrar las categorías y usuarios en la UI */}
    </div>
  );
}

export default CategoriasPage;
