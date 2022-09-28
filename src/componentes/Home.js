import React from "react";
import { useRef, useEffect, useState } from "react";

/* Se inicia función*/
function Todolist() {
  /*Se crea una variable tareaPendiente, con un valor persistente de tipo "Null*/
  let tareaPendiente = useRef(null);

  /*Se crea un useState, para modificar cada nuevaTarea en setNuevaTarea*/
  const [nuevaTarea, setNuevaTarea] = useState([]);

  const [urlFetchAPI] = useState(
    "http://assets.breatheco.de/apis/fake/todos/user/DiegoAndres"
  );

  useEffect(() => {
    getNuevaTarea(urlFetchAPI);
  }, [])

  const getNuevaTarea = (url) => {
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  const getUsuario = (url) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((data) => console.log(data.result))
      .catch((error) => console.log(error));
  };

  const actualizarTarea = (url, nuevaTarea) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(nuevaTarea),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const agregarTarea = (evento) => {
    if (evento.keyCode === 13 && tareaPendiente.value !== "") {
      setNuevaTarea(nuevaTarea.concat(tareaPendiente.value));
      tareaPendiente.value = "";
    }
  };

  const borrarTarea = (index) => {
    nuevaTarea.splice(index, 1);
    setNuevaTarea([...nuevaTarea]);
  };

  const borrarTodo = () => {
    fetch(urlFetchAPI, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

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
};

export default Todolist;