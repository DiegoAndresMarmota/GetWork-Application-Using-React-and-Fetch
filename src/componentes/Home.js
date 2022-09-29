import React from "react";
import { useRef, useEffect, useState } from "react";

function Todolist() {
  /*Parametros iniciales*/
  let tareaPendiente = useRef(null);

  const [nuevaTarea, setNuevaTarea] = useState([]);

  /*Primera instrucción: agregarTarea*/
  const agregarTarea = (evento) => {
    if (evento.keyCode === 13 && tareaPendiente.value !== "") {
      setNuevaTarea(nuevaTarea.concat(tareaPendiente.value));
      tareaPendiente.value = "";
    }
  };

  /*Segunda instrucción: borrarTarea*/
  const borrarTarea = (index) => {
    nuevaTarea.splice(index, 1);
    setNuevaTarea([...nuevaTarea]);
  };

  /*---------------------------------------------------------------------*/

  const url = "https://assets.breatheco.de/apis/fake/todos/user/omonroy";
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  /*GET*/

  useEffect(() => {
    fetch(url, config)
      .then((response) => response.json())
      .then((response) => console.log(response))
      /*.then(data => setNuevaTarea(data))*/
      .catch((error) => console.log(error));
  });

  /*PUT
  
  useEffect(() => {
    if (nuevaTarea !== []) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok);
          console.log(resp.status);
          console.log(resp.text());
          return resp.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [nuevaTarea]);
  
  */

  /*----------------------------------------------------------------------*/
  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title text-center">
            To-do List
            <i class="fa-solid fa-list-check"></i>
            {/*Componente de Fontawesome */}
          </h1>
          <ul className="list-group list-group-flush">
            <div className="input-group mb-2 list-group list-group-flush">
              <input
                /* El evento se ejecuta al liberar la tecla y se añade a agregarTarea*/
                onKeyUp={agregarTarea}
                /*Se deja como referencia guardada de tareaPendiente para acceder a ellos de forma posterior*/
                ref={(referenciaDeElementoPendiente) =>
                  (tareaPendiente = referenciaDeElementoPendiente)
                }
                type="text"
                id="input"
                class="list-group-item"
                placeholder="¿Qué es lo que necesitas hacer?"
              />
            </div>
            {!!nuevaTarea.length > 0 &&
              /*Si la longitud es mayor y distinta a cero, se creara un n uevo array, cuyo elemento actual será(primeraTarea), y tendra un indice incial(primerOrden)*/
              nuevaTarea.map((primeraTarea, primerOrden) => {
                return (
                  /*Componente de Bootstrap/List Group, tipo escalera*/
                  <li class="list-group-item" key={primerOrden}>
                    {primeraTarea}
                    <i
                      class="fa-solid fa-trash-can"
                      id="eliminar"
                      onClick={() => borrarTarea(primerOrden)}
                    ></i>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card-footer text-muted">
          Tareas pendientes: {nuevaTarea.length}
        </div>
      </div>
    </div>
  );
}

export default Todolist;
