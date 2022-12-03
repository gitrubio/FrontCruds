import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeState } from "../../helper/const";
import axios from "axios";
import "../../styles/listaPlates.styles.css";

const ListaPlatos = () => {
  const [platos, setplatos] = useState([]);
  const navigate = useNavigate();

  const editar = (plato) => {
    changeState(plato);
    navigate("/");
  };

  const eliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:7002/api/plates/${id}`);
      obtenerDatos();
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatos = async () => {
    try {
      const result = await axios.get("http://localhost:7002/api/plates");
      if (result) setplatos(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>descripcion</th>
            <th>precion</th>
            <th>region</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {platos.map((plato) => {
            return (
              <tr key={plato.id}>
                <td>{plato.name}</td>
                <td>{plato.price}</td>
                <td>{plato.region}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminar(plato.id)}
                    >
                      Borrar
                    </button>

                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        editar(plato);
                      }}
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
  );
};

export default ListaPlatos;
