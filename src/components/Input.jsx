import React from "react";

const Input = ({ label, name, register, type = "text", ...rest }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", marginBottom: 4 }}>{label}</label>
    <input
      {...register(name)}
      type={type}
      id={name}
      name={name}
      style={{ padding: 8, width: "100%" }}
      {...rest}
    />
  </div>
);

console.log(Input);


export default Input;