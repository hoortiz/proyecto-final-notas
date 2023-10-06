import React, { useEffect, useState } from 'react'
import ListGroup from '../component/ListGroup'
import Form from '../component/Form'
import Notas from '../component/Notas'


export default function Index(){

    const [notas, setNotas] = useState([])
    const [oldNota, setOldNota] = useState([])

    const getNotas = async (errorAPI)=>{
        try {
            const response = await fetch ('http://168.227.245.2/api/notas/')
            const result = await response.json()
            setNotas(result)
        } catch (error) {
            console.log("Error accediendo al API:" + error);
        }
    }

    useEffect(()=>{
        getNotas();
    },[notas])

    const deleteNota = async(id)=>{
        await fetch ('http://168.227.245.2/api/notas/'+id,{        
        method: 'DELETE',
        mode: 'cors'
        })  
    }

    const getNota = async(id)=>{
        const nota = await fetch ('http://168.227.245.2/api/notas/'+id)
        const result = await nota.json()
        setOldNota(result)
    }


    return(
        <div className='contenedor-app'>
            <div className="row">
            <div className="col-sm-12 col-md-4">
                <Form oldNota={oldNota}/>
            </div>
            
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
