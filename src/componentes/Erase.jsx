import React from "react";

const Erase = (props) => {
  const borrarTarea = () => {
    props.borrar(props.id);
  };
  return (
    <div className="card-title text-center">
      <span>{props.list.label}</span>
      <button className="fas fa-trash float-right" onClick={borrarTarea}>
        {"  "}
      </button>
    </div>
  );
};

export default Erase;
