import React from 'react';

function getLeyenda(promedio) {
    if (promedio >= 1 && promedio <= 3.9) return { texto: "Deficiente", clase: "leyenda-deficiente" };
    if (promedio >= 4.0 && promedio <= 5.5) return { texto: "Con mejora", clase: "leyenda-mejora" };
    if (promedio >= 5.6 && promedio <= 6.4) return { texto: "Buen trabajo", clase: "leyenda-bueno" };
    if (promedio >= 6.5 && promedio <= 7.0) return { texto: "Destacado", clase: "leyenda-destacado" };
    return { texto: "", clase: "" };
}

function List({ items, deleteItem, editItem }) {
    return (
        <ul className="evaluaciones-list">
            {items.map(item => {
                const promedioNum = Number(item.promedio);
                const promedioFormateado = promedioNum.toFixed(1);
                const leyenda = getLeyenda(promedioNum);

                return (
                    <li key={item.id} className="evaluacion-card">
                        <div className="evaluacion-info">
                            <div>
                                <span className="label">Alumno:</span>
                                <span className="value nombre">{item.nombre}</span>
                            </div>
                            <div>
                                <span className="label">Asignatura:</span>
                                <span className="value">{item.asignatura}</span>
                            </div>
                            <div>
                                <span className="label">Promedio:</span>
                                <span className="value promedio">{promedioFormateado}</span>
                            </div>
                            <div className={`leyenda-box ${leyenda.clase}`}>
                                {leyenda.texto}
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="edit" onClick={() => editItem(item)}>Editar</button>
                            <button className="delete" onClick={() => deleteItem(item.id)}>Eliminar</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

export default List;