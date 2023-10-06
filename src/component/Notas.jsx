import React from "react";

export default function Notas({title,content,id,deleteNota,getNota}){
    return (
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{title}</div>
                    {content}
                </div>
                <div className="d-flex justify-content-between w-50">
                    <button onClick={(e)=>getNota(id)} className="btn btn-info btn-sm btn-block ml-3">Editar</button>
                    <button onClick={(e)=>deleteNota(id)} className="btn btn-outline-danger btn-sm">Eliminar</button>
                </div>
            </li>
    );
}