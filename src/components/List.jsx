import React from 'react';

function List({ items, deleteItem, editItem }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <span>{item.value}</span> {/* Muestra el valor del elemento */}
                    <div className="button-container"> {/* Contenedor para los botones */}
                        <button className="edit" onClick={() => editItem(item)}>Editar</button> {/* Botón para editar */}
                        <button onClick={() => deleteItem(item.id)}>Eliminar</button> {/* Botón para eliminar */}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default List;