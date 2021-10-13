import React from "react";
import { ChangeHandler, Path, UseFormRegister } from "react-hook-form";
import { FormValues } from "../models/form-values";

interface InputProps {
  id: string;
  label: Path<FormValues>;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  type: string;
  required: boolean;
}

export default React.forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<FormValues>>
>(({ id, label, onChange, onBlur, name, type, required }: InputProps, ref) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      className="bg-gray-100 px-4 py-2 rounded-xl mr-2"
      id={id}
      ref={ref}
      name={name}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
    />
  </>
));
