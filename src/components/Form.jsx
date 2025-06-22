// Ejemplo de Form.jsx
import React, { useState, useEffect } from 'react';

function Form({ addItem, itemToEdit, updateItem }) {
    const [input, setInput] = useState('');

    useEffect(() => {
        if (itemToEdit) {
            setInput(itemToEdit.value);
        } else {
            setInput('');
        }
    }, [itemToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (itemToEdit) {
            updateItem({ ...itemToEdit, value: input });
        } else {
            addItem(input);
        }
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="mi-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ingrese un dato"
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

export default Form;
