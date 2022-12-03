export const initialPlate = {
    id : 0,
    name : '',
    price :  0,
    region : ''
}
export const initialtaks = {
    id : 0,
    name : '',
    priority :  0,
    horaInicio : '',
    horaFin : ''
}

export let plate  = initialPlate
export let taks  = initialPlate

export const changeState = (plato) =>{
    plate = plato
}

export const changeTaks = (tarea) =>{
    taks = tarea
}


export let workspace = 'Platos'
export let changeSpace = (space) => {
    workspace = space
}

  
