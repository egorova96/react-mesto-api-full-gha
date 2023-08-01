import { useState } from "react";
export function useForm(valuesOfInputs = {}) {
    const [values, setValues] = useState(valuesOfInputs);
    const handleChange = (evt) => {
      const { value, name } = evt.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}