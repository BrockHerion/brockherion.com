import React from "react";

interface FormProps {
  onSubmit: () => {};
  id: string;
  action?: string;
  method?: string;
  name?: string;
  target?: string;
  children: React.ReactNode;
}

export default function Form({
  onSubmit,
  id,
  action,
  method,
  name,
  target,
  children,
}: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      id={id}
      action={action}
      method={method}
      name={name}
      target={target}
    >
      {children}
    </form>
  );
}
