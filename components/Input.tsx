import React from "react";

interface InputProps {
  id: string;
  type: string;
}

export default React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, type }: InputProps,
  ref
) {
  return (
    <>
      <label></label>
      <input />
    </>
  );
});
