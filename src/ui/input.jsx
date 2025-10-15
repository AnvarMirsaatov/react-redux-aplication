import React from "react";

const Input = ({ label, type = "text", state, setState }) => {
  return (
    <div className="form-floating">
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type={type}
        className="form-control"
        id={label}
        placeholder={label}
      />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};

export default Input;
