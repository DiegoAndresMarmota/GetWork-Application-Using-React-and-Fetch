import React, { useState, useEffect } from "react";
import Add from "./Add.jsx";
import Erase from "./Erase.jsx";

function Home() {
  const [listaTareas, setlistaTareas] = useState([]);

  useEffect(() => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/DiegoAndresEchalar")
      .then((response) => response.json())
      .then((result) => setlistaTareas(result))
      .catch((error) => console.log("error", error));
  }, []);

  var requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([...listaTareas]),
    redirect: "follow",
  };

  fetch(
    "http://assets.breatheco.de/apis/fake/todos/user/DiegoAndresEchalar",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  const nuevaTarea = (actividad) => {
    console.log(actividad);
    setlistaTareas([actividad, ...listaTareas]);
  };

  const borrar = (id) => {
    const listaFiltrada = listaTareas.filter((e, index) => index !== id);
    setlistaTareas(listaFiltrada);

    var requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...listaFiltrada]),
      redirect: "follow",
    };

    fetch(
      "http://assets.breatheco.de/apis/fake/todos/user/DiegoAndresEchalar",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="Main container">
      <Add nuevaTarea={nuevaTarea} />
      <div className="Lista1">
        {listaTareas.map((e, index) => (
          <Erase key={index} list={e} borrar={borrar} id={index} />
        ))}
      </div>
      <div className="pendiente">
        <h5 className="card-footer text-muted">
          Pendientes por realizar: {listaTareas.length}
        </h5>
      </div>
    </div>
  );
}

export default Home;
