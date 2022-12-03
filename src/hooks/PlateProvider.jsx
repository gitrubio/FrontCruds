import React, { createContext, useState } from 'react'

export const PlateContext = createContext({})   


const PlateProvider = ({children}) => {
    const [plate, setPlate] = useState(null)

  return (
   <PlateContext.Provider  value={{
    plate, 
    setPlate,
  }}>
   {children}
   </PlateContext.Provider>
  )
}

export default PlateProvider
