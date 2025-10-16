const Input = ({ label, type = "text", state, setState, validate }) => {
  return (
    <div className="form-floating mb-3">
      <input
        value={state}
        onChange={(e) => setState(e.target.value)}
        type={type}
        className={`form-control ${validate ? "is-invalid" : ""}`}
        id={label}
        placeholder={label}
      />
      {validate && (
        <div className="invalid-feedback m-0 text-start p-0">
          {validate}
        </div>
      )}
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default Input;
