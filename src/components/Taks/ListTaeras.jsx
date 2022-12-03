import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { changeTaks } from '../../helper/const';
import axios from 'axios';
import '../../styles/listaPlates.styles.css'
import moment from 'moment/moment';
const Listatareas = () => {

    const [tareas, settareas] = useState([])
    const navigate = useNavigate()


    const editar = (tarea) =>{
        changeTaks(tarea)
        navigate('/TAREAS')
    }

    const eliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:7002/api/taks/${id}`)
            obtenerDatos()
        } catch (error) {
            console.log(error)
        }
    };

    const obtenerDatos = async () => {
        try {
        const result = await axios.get('http://localhost:7002/api/taks')
        if(result) settareas(result.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        obtenerDatos()
    }, [])

    return (
        <>

            <table className="table">
                <thead>
                    <tr>
                        <th>descripcion</th>
                        <th>prioridad</th>
                        <th>fecha inicio</th>
                        <th>fecha fin</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea) => {
                        return (
                            <tr key={tarea.id}>
                                <td>{tarea.name}</td>
                                <td>{tarea.priority ?? 0}</td>
                                <td>{moment(tarea.horaInicio).format('DD-MM-YYYY')}</td>
                                <td>{moment(tarea.horaFin).format('DD-MM-YYYY')}</td>
                                <td>
                                    <div className='d-flex justify-content-evenly'>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminar(tarea.id)}
                                        >
                                            Borrar
                                        </button>
                                    
                                            <button
                                                className="btn btn-warning"
                                                onClick={()=>{editar(tarea)}}
                                            >
                                                Editar
                                            </button>
                                        
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Listatareas