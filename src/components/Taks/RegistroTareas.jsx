import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { changeTaks, initialtaks, taks } from "../../helper/const";

const FormTarea = () => {
  const [Tarea, setTarea] = useState({
    name       : taks.name,
    priority   : taks.priority,
    horaInicio : moment(taks.horaInicio).format("dd/mm/YYYY"),
    horaFin    : moment(taks.horaFin).format("DD-MM-YYYY"),
  });

  const validarDatos = () => {
    if (Tarea.name === "") {
      Swal.fire(
        "UPS!",
        "Su Tarea no ha sido creado<br/> por favor ingrese un name",
        "failed"
      );
      return false;
    }
    if (Tarea.priority < 0) {
      Swal.fire(
        "UPS!",
        "Su Tarea no ha sido creado<br/> prioridad minimo de 0",
        "failed"
      );
      return false;
    }
    if (Tarea.horaInicio === "") {
      Swal.fire(
        "UPS!",
        "Su Tarea no ha sido creado<br/> ingrese una hora inicial por favor",
        "failed"
      );
      return false;
    }
    if (Tarea.horaFin === "") {
      Swal.fire(
        "UPS!",
        "Su Tarea no ha sido creado<br/> ingrese una hora final por favor",
        "failed"
      );
      return false;
    }
    // eslint-disable-next-line

    return true;
  };

  const guardarTarea = async () => {
    try {
      if (!validarDatos()) {
        return;
      } else {
        axios
          .post("http://3.233.90.188:7002/api/taks", Tarea)
          .then((result) => {
            Swal.fire("HECHO!", "Su Tarea ha sido creado", "success");
          })
          .catch((error) => {
            Swal.fire("error!", "Su Tarea no se logro crear", "error");
          });
      }
    } catch (error) {
      console.log(error);
    }
    limpiar();
  };
  const editarTarea = async () => {
    try {
      if (!validarDatos()) {
        return;
      } else {
        await axios.put(`http://3.233.90.188:7002/api/taks/${taks.id}`, Tarea);
        Swal.fire("HECHO!", "Su Tarea ha sido editado", "success");
      }
    } catch (error) {
      console.log(error);
    }
    limpiar();
  };

  const limpiar = () => {
    changeTaks(initialtaks);
    setTarea({
      name       : "",
      priority   : 0,
      horaInicio : "",
      horaFin    : "",
    });
  };

  return (
    <>
      <div
        style={{
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          position       : "relative",
          top            : "10px",
        }}
      >
        <form style={{ width: "600px" }}>
          <h3 style={{ fontWeight: "bold" }}>
            {taks.name !== "" ? "Editar Tarea" : "Hacer Tarea"}
          </h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={Tarea.name}
              onChange={(e) => setTarea({ ...Tarea, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              prioridad
            </label>
            <input
              type="number"
              min={0}
              max={5}
              className="form-control"
              id="price"
              value={Tarea.priority}
              onChange={(e) => setTarea({ ...Tarea, priority: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="form-label">
              hora inicio
            </label>
            <input
              type="date"
              className="form-control"
              id="region"
              value={Tarea.horaInicio}
              onChange={(e) =>
                setTarea({ ...Tarea, horaInicio: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="form-label">
              hora fin
            </label>
            <input
              type="date"
              className="form-control"
              id="region"
              value={Tarea.horaFin}
              onChange={(e) => setTarea({ ...Tarea, horaFin: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between">
            {taks.name !== "" ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", margin: "5px" }}
                onClick={editarTarea}
              >
                Editar
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", margin: "5px" }}
                onClick={guardarTarea}
              >
                Enviar
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              style={{ width: "100%", margin: "5px" }}
              onClick={limpiar}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTarea;
