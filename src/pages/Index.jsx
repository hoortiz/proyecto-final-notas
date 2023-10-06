import React, { useEffect, useState } from 'react'
import ListGroup from '../component/ListGroup'
import Form from '../component/Form'
import Notas from '../component/Notas'


export default function Index(){

    const [notas, setNotas] = useState([])
    const [oldNota, setOldNota] = useState([])

    const getNotas = async ()=>{
        const errorAPI = "";
        try {
            const response = await fetch ('http://localhost:5001/api/notas')
            const result = await response.json()
            setNotas(result)
          } catch (error) {
            errorAPI = "Error accediendo al api";
            console.log('There was an error', error);
          }
    }

    useEffect(()=>{
        getNotas();
    },[notas])

    const deleteNota = async(id)=>{
        await fetch ('http://localhost:5001/api/notas/'+id,{        
        method: 'DELETE',
        mode: 'cors'
        })  
    }

    const getNota = async(id)=>{
        const nota = await fetch ('http://localhost:5001/api/notas/'+id)
        const result = await nota.json()
        setOldNota(result)
    }


    return(
        <div className='contenedor-app'>
            <div className="row">
            <div className="col-sm-12 col-md-4">
                <Form oldNota={oldNota}/>
            </div>
            {errorAPI}
            <div className="col-sm-12 col-md-8">
                <ListGroup> 
                    {notas.map((nota,index) => (
                        <Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content}/>
                    ))}
                </ListGroup>
            </div>
            </div>
        </div>
    )
}
