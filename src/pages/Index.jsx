import React, { useEffect, useState } from 'react'
import ListGroup from '../component/ListGroup'
import Form from '../component/Form'
import Notas from '../component/Notas'


export default function Index(){

    const [notas, setNotas] = useState([])
    const [oldNota, setOldNota] = useState([])
    const URL = 'http://168.227.245.2/api/notas/'

    const getNotas = async (errorAPI)=>{
        try {
		const response = await fetch (URL)
            const result = await response.json()
            console.log('URL:'+URL)
            setNotas(result)
        } catch (error) {
            console.log("Error accediendo al API:" + error);
        }
    }

    useEffect(()=>{
        getNotas();
    },[notas])

    const deleteNota = async(id)=>{
        await fetch (URL+id,{        
        method: 'DELETE',
        mode: 'cors'
        })  
    }

    const getNota = async(id)=>{
        const nota = await fetch (URL+id)
        const result = await nota.json()
        setOldNota(result)
    }


    return(
        <div className='contenedor-app'>
            <div className="header">
				<h1>Proyecto Final Henrry Ortiz</h1>
			</div>
            
			<div className="row">
            
            <div className="col-sm-12 col-md-8">
				<div className='card'>
					<div className="card-header">
						Notas
					</div>
					<ListGroup className=''> 
						{notas.map((nota,index) => (
							<Notas key={index} deleteNota={deleteNota} getNota={getNota} id={nota._id} title={nota.title} content={nota.content}/>
						))}
					</ListGroup>
				</div>
            </div>

            <div className="col-sm-12 col-md-4">
                <Form oldNota={oldNota}/>
            </div>

            </div>
        </div>
    )
}
