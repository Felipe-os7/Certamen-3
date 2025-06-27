// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from 'react';

// Componente funcional Form que recibe props para agregar, editar y actualizar ítems
function Form({ addItem, itemToEdit, updateItem }) {
    // Estado local para los valores del formulario
    const [input, setInput] = useState({
        nombre: '',
        asignatura: '',
        promedio: ''
    });

    // useEffect se ejecuta cuando cambia itemToEdit
    useEffect(() => {
        if (itemToEdit) {
            // Convierte el promedio a string sin punto si es decimal
            let promedioStr = itemToEdit.promedio ? String(itemToEdit.promedio).replace('.', '') : '';
            setInput({
                nombre: itemToEdit.nombre || '',
                asignatura: itemToEdit.asignatura || '',
                promedio: promedioStr
            });
        } else {
            setInput({ nombre: '', asignatura: '', promedio: '' });
        }
    }, [itemToEdit]);

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Función para poner la primera letra de cada palabra en mayúscula
        const capitalizeWords = (str) =>
            str.replace(/\b\w/g, char => char.toUpperCase());

        setInput(prev => ({
            ...prev,
            [name]:
                name === "nombre" || name === "asignatura"
                    ? capitalizeWords(value)
                    : value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.nombre.trim() || !input.asignatura.trim() || input.promedio === '') return;

        let promedioStr = input.promedio.replace('.', ''); 
        let promedioNum;

        if (promedioStr.length === 2) {
            promedioNum = parseFloat(`${promedioStr[0]}.${promedioStr[1]}`);
        } else if (promedioStr.length === 3) {

            promedioNum = parseFloat(`${promedioStr[0]}.${promedioStr.slice(1)}`);
        } else if (promedioStr.length === 1) {
            promedioNum = parseFloat(`${promedioStr[0]}.0`);
        } else {
            promedioNum = parseFloat(input.promedio);
        }

        if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 7) return;

        if (itemToEdit) {
            updateItem({ ...itemToEdit, ...input, promedio: promedioNum });
        } else {
            addItem({ ...input, promedio: promedioNum });
        }
        setInput({ nombre: '', asignatura: '', promedio: '' });
    };

    // Renderiza el formulario
    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '18px', textAlign: 'center' }}>
                {itemToEdit ? 'Editar Nueva Evaluación' : 'Agregar Nueva Evaluación'}
            </h2>
            <input
                className="mi-input"
                name="nombre"
                value={input.nombre}
                onChange={handleChange}
                placeholder="Nombre del alumno"
                autoComplete="off"
            />
            <input
                className="mi-input"
                name="asignatura"
                value={input.asignatura}
                onChange={handleChange}
                placeholder="Asignatura"
                autoComplete="off"
            />
            <input
                className="mi-input"
                name="promedio"
                type="text"
                maxLength={4}
                value={input.promedio}
                onChange={handleChange}
                placeholder="Promedio (0.0 - 7.0)"
                autoComplete="off"
            />
            <button
              className={itemToEdit ? "edit" : "add"}
              type="submit"
            >
              {itemToEdit ? 'Actualizar' : 'Agregar'}
            </button>
        </form>
    );
}

export default Form; // Exporta el componente para usarlo en otros archivos
