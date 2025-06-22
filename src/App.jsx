import React, { useState, useEffect } from 'react';
import Form from './components/Form'; 
import List from './components/List'; 
import './App.css';

function App() {
    // Estado para almacenar los elementos, inicializa desde localStorage si existe
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('items');
        return storedItems ? JSON.parse(storedItems) : []; // Parsea los elementos almacenados o devuelve un array vacío
    });
    
    // Estado para almacenar el elemento que se está editando
    const [itemToEdit, setItemToEdit] = useState(null);

    // Función para agregar un nuevo elemento
    const addItem = (value) => {
        setItems((prevItems) => [...prevItems, { id: Date.now(), value }]); // Agrega un nuevo elemento con un ID único
    };

    // Función para actualizar un elemento existente
    const updateItem = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)) // Reemplaza el elemento editado
        );
        setItemToEdit(null); // Resetea el elemento a editar después de actualizar
    };

    // Función para eliminar un elemento
    const deleteItem = (id) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id)); // Filtra el elemento que se va a eliminar
    };

    // Función para establecer el elemento a editar
    const editItem = (item) => {
        setItemToEdit(item); // Establece el elemento que se va a editar
    };

    // Efecto para guardar los elementos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items)); // Almacena los elementos en formato JSON
    }, [items]);

    return (
        <div className="App">
            <h1>CRUD con Local Storage</h1>
            <div className="form-container">
                {/* Componente del formulario para agregar o editar elementos */}
                <Form addItem={addItem} itemToEdit={itemToEdit} updateItem={updateItem} />
            </div>
            <div className="list-container">
                {/* Componente de la lista para mostrar los elementos */}
                <List items={items} deleteItem={deleteItem} editItem={editItem} />
            </div>
        </div>
    );
}

export default App;
