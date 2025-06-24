// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from 'react';

// Componente funcional Form que recibe props para agregar, editar y actualizar ítems
function Form({ addItem, itemToEdit, updateItem }) {
    // Estado local para el valor del input
    const [input, setInput] = useState('');

    // useEffect se ejecuta cuando cambia itemToEdit
    useEffect(() => {
        if (itemToEdit) {
            // Si hay un ítem para editar, coloca su valor en el input
            setInput(itemToEdit.value);
        } else {
            // Si no, limpia el input
            setInput('');
        }
    }, [itemToEdit]);

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del form
        if (!input.trim()) return; // Si el input está vacío, no hace nada
        if (itemToEdit) {
            // Si se está editando, actualiza el ítem
            updateItem({ ...itemToEdit, value: input });
        } else {
            // Si no, agrega un nuevo ítem
            addItem(input);
        }
        setInput(''); // Limpia el input después de enviar
    };

    // Renderiza el formulario
    return (
        <form onSubmit={handleSubmit}>
            <input
                className="mi-input" // Clase para estilos personalizados
                value={input} // Valor controlado por el estado
                onChange={e => setInput(e.target.value)} // Actualiza el estado al escribir
                placeholder="Ingrese un dato" // Texto de ayuda
            />
            <button
              className={itemToEdit ? "edit" : "add"} // Cambia la clase según si se edita o agrega
              type="submit"
            >
              {itemToEdit ? 'Actualizar' : 'Agregar'} // Texto del botón según la acción
            </button>
        </form>
    );
}

export default Form; // Exporta el componente para usarlo en otros archivos
