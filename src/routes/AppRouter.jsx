import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FormSolicitud from '../components/Plates/RegistroPlatos'
import ListaPlatos from '../components/Plates/ListaPlatos'
import NavBar from '../components/Navbar'
import FormTarea from '../components/Taks/RegistroTareas'
import Listatareas from '../components/Taks/ListTaeras'



const AppRouter = () => {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Navigate to='/PLATOS'/>}/>
                <Route path="/PLATOS" element={ <FormSolicitud />} />
                <Route path="/TAREAS" element={ <FormTarea />} />
                <Route path="/crearPLATOS" element={ <ListaPlatos/> } />
                <Route path="/crearTAREAS" element={ <Listatareas/> } />

            </Routes>
        </>
    )
}

export default AppRouter
