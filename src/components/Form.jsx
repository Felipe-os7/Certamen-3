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
        // Si hay un item para editar, carga sus valores en el formulario
        if (itemToEdit) {
            // Convierte el promedio a string sin punto si es decimal
            let promedioStr = itemToEdit.promedio ? String(itemToEdit.promedio).replace('.', '') : '';
            setInput({
                nombre: itemToEdit.nombre || '',
                asignatura: itemToEdit.asignatura || '',
                promedio: promedioStr
            });
        } else {
            // Si no hay item para editar, limpia el formulario
            setInput({ nombre: '', asignatura: '', promedio: '' });
        }
    }, [itemToEdit]);

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Función para poner la primera letra de cada palabra en mayúscula
        const capitalizeWords = (str) =>
            str.replace(/\b\w/g, char => char.toUpperCase());

        // Actualiza el estado del input, capitalizando si es nombre o asignatura
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
        // Valida que los campos no estén vacíos
        if (!input.nombre.trim() || !input.asignatura.trim() || input.promedio === '') return;

        // Transforma el promedio ingresado a decimal según la cantidad de dígitos
        let promedioStr = input.promedio.replace('.', ''); 
        let promedioNum;

        if (promedioStr.length === 2) {
            // Ejemplo: "55" -> 5.5
            promedioNum = parseFloat(`${promedioStr[0]}.${promedioStr[1]}`);
        } else if (promedioStr.length === 3) {
            // Ejemplo: "675" -> 6.75
            promedioNum = parseFloat(`${promedioStr[0]}.${promedioStr.slice(1)}`);
        } else if (promedioStr.length === 1) {
            // Ejemplo: "7" -> 7.0
            promedioNum = parseFloat(`${promedioStr[0]}.0`);
        } else {
            // Si ya tiene punto, lo toma directo
            promedioNum = parseFloat(input.promedio);
        }

        // Valida que el promedio sea un número válido entre 0 y 7
        if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 7) return;

        // Si se está editando, actualiza el item, si no, agrega uno nuevo
        if (itemToEdit) {
            updateItem({ ...itemToEdit, ...input, promedio: promedioNum });
        } else {
            addItem({ ...input, promedio: promedioNum });
        }
        // Limpia el formulario después de agregar o actualizar
        setInput({ nombre: '', asignatura: '', promedio: '' });
    };

    // Renderiza el formulario
    return (
        <form onSubmit={handleSubmit}>
            <h2
                style={{
                    marginBottom: '18px',
                    textAlign: 'center',
                    fontSize: '1.2rem' // Reduce el tamaño un 20%
                }}
            >
                {itemToEdit ? 'Editar Evaluación' : 'Agregar Evaluación'}
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
