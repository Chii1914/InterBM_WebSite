// ModalComponent.jsx
import React, { useState } from 'react';

const ModalComponent = ({ userData, onSave, onClose }) => {
  const [user, setUser] = useState(userData || { run: '', nombre_completo: '', categoria: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="run"
          value={user.run}
          onChange={handleChange}
          placeholder="RUN"
        />
        <input
          type="text"
          name="nombre_completo"
          value={user.nombre_completo}
          onChange={handleChange}
          placeholder="Nombre Completo"
        />
        <input
          type="text"
          name="categoria"
          value={user.categoria}
          onChange={handleChange}
          placeholder="Categoría"
        />
        <button type="submit">Guardar</button>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ModalComponent;
