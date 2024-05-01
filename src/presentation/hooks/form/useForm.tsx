import { ChangeEvent, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    // * Propiedades
    values,
    // * Metodos
    handleChange,
    resetForm,
  };
};
