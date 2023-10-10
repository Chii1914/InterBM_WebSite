import React, { useState } from "react";

const categoriasData = ["Categoria 1", "Categoria 2", "Categoria 3"];

const personasData = {
  "Categoria 1": [
    { id: 1, nombre: "Persona 1", edad: 30 },
    { id: 2, nombre: "Persona 2", edad: 25 },
  ],
  "Categoria 2": [
    { id: 3, nombre: "Persona 3", edad: 28 },
    { id: 4, nombre: "Persona 4", edad: 22 },
  ],
  "Categoria 3": [
    { id: 5, nombre: "Persona 5", edad: 27 },
    { id: 6, nombre: "Persona 6", edad: 32 },
  ],
};

function CategoriasPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div>
      <h1>Página de Categorías</h1>
      <div className="categories-section">
        <h2>Seleccionar una categoría:</h2>
        <button onClick={handleShowCategories}>
          Seleccionar
        </button>
        {showCategories && (
          <ul>
            {categoriasData.map((category) => (
              <li key={category}>
                <button onClick={() => handleCategorySelect(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="people-section">
        {selectedCategory && (
          <>
            <h2>Personas en {selectedCategory}:</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                {personasData[selectedCategory].map((persona) => (
                  <tr key={persona.id}>
                    <td>{persona.id}</td>
                    <td>{persona.nombre}</td>
                    <td>{persona.edad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default CategoriasPage;
