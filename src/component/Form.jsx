import React, {useEffect, useState} from 'react'

export default function Form({oldNota}){

    const [nota,setNota] = useState({
        title: '',
        content: ''
    })

    const handleChange = (e) => {
        let newNota = {
            [e.target.name] : e.target.value,
            [e.target.name] : e.target.value
            
        }
        setNota({...nota,...newNota})
    }

    const saveNota = async ()=> {
        let URL = '';
        let params = [];
        
        if(nota._id){
            URL = 'http://localhost:5001/api/notas/' + nota._id
            params = {
                method: 'PATCH',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }else{
            URL = 'http://localhost:5001/api/notas/'
            params = {
                method: 'POST',
                body: JSON.stringify(nota),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        await fetch(URL,params)
    }

    const onSubmit = (e)=>{
        e.preventDefault();
        saveNota()
        setNota({
            'title':'',
            content: ''
        })
    }

    useEffect((nota)=>{
        setNota({...nota,...oldNota})
    },[oldNota],[nota]);

  return(
    <div className="card">
        <div className="card-header">
            Agregar Nota
        </div>
        <div className="card-body">
            <form action="" onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <input type='text' name='title' value={nota.title} className='form-control mb-3' placeholder='Titulo' onChange={(e)=> handleChange(e)}/>
                </div>
                <div className='form-group'>
                    <textarea name='content' className='form-control mb-3' value={nota.content}  placeholder='Conenido de la tarea' onChange={(e)=> handleChange(e)}/>
                </div>
                {nota._id
                ?<button type='submit' className='btn btn-outline-success btn-sm btn-block'>Actualizar</button>
                :<button type='submit' className='btn btn-outline-success btn-sm btn-block'>Guardar</button>
                }
            </form>
        </div>
    </div>
   )
  }
