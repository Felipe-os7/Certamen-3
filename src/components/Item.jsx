import React from 'react';

function Item({ item, deleteItem, editItem }) {
    return (
        <li>
            <span>{item.value}</span> {/* Muestra el valor del elemento */}
            <div className="button-container"> {/* Contenedor para los botones */}
                <button className="edit" onClick={() => editItem(item)}>Editar</button> {/* Botón para editar */}
                <button onClick={() => deleteItem(item.id)}>Eliminar</button> {/* Botón para eliminar */}
            </div>
        </li>
    );
}

export default Item;


