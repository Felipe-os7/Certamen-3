import React, { useState, useEffect } from 'react';
import Form from './components/Form'; 
import List from './components/List'; 
import './App.css';

function App() {
    // Estado para almacenar los elementos, inicializa desde localStorage si existe
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : [];
    });
    
    // Estado para almacenar el elemento que se está editando
    const [itemToEdit, setItemToEdit] = useState(null);

    // Función para agregar un nuevo elemento
    const addItem = (item) => {
        setItems((prevItems) => [...prevItems, { ...item, id: Date.now() }]);
    };

    // Función para actualizar un elemento existente
    const updateItem = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        setItemToEdit(null);
    };

    // Función para eliminar un elemento
    const deleteItem = (id) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    // Función para establecer el elemento a editar
    const editItem = (item) => {
        setItemToEdit(item);
    };

    // Efecto para guardar los elementos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    return (
        <div className="App">
            <h2>Evaluación de Alumnos</h2>
            <div className="form-container">
                <Form addItem={addItem} itemToEdit={itemToEdit} updateItem={updateItem} />
            </div>
            <div className="evaluaciones-titulo">
                <h3>Evaluaciones Guardadas</h3>
            </div>
            <div className="list-container">
    
                <List items={items} deleteItem={deleteItem} editItem={editItem} />
            </div>
        </div>
    );
}

export default App;
