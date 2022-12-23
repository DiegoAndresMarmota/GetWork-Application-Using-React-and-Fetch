import React, { useState } from "react";

function Add(props) {
  const [tarea, setTarea] = useState("");

  const formulario = (event) => {
    setTarea({ label: event.target.value, done: false });
  };
  //Visualizar tarea
  console.log(tarea);

  const submit = (event) => {
    event.preventDefault();
    props.nuevaTarea(tarea);
    setTarea("");
  };
  return (
    <div className="container text-center">
      <div className="card mt-4">
        <div className="card-body">
          <h1 className="card-title text-center">
            To do list <i className="fas fa-tasks"></i>
          </h1>
          <ul className="list-group list-group-flush">
            <div className="input-group mb-2 list-group list-group-flush">
              <form className="list-group-item" onSubmit={submit}>
                <input
                  className="form-input"
                  type="text"
                  onChange={formulario}
                  placeholder="¿Qué necesito hacer hoy?"
                  value={tarea.label}
                />
                <button className="todo-button"> Agregar Tarea </button>
              </form>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Add;
