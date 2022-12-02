import React, { useState } from "react";

const List = (props) => {
  const [data, setdata] = useState("");

  const [validation, setValidation] = useState(true);

  const myForm = (event) => {
    setdata(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    if (data.trim() !== "") {
      props.newTask(data);
      setdata("");
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  return (
    <div className="container-fluid text-center">
      <h1 className="text-center p-4">Todo-list</h1>

      <form className="form" onSubmit={submit}>
        <div className="text-center mb-2">
          ¿Tienes algún pendiente para el día de hoy?
        </div>
        <input className="" value={data} onChange={myForm} />
        <div className="my-4">
          <button className="btn btn-outline-dark btn-sm">Agregar!</button>
        </div>

        {!validation && (
          <div className="validation text-danger">
            {" "}
            ¿Olvidaste agregar una nueva tarea?
          </div>
        )}
      </form>
      <hr className=""></hr>
    </div>
  );
};

export default List;
