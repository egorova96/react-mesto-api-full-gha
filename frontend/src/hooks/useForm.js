import { useState, useCallback } from "react";
export function useForm(valuesOfInputs = {}) {
    const [values, setValues] = useState(valuesOfInputs);
    const [ errors, setErrors ] = useState({});
    const [ isValid, setIsValid ] = useState(true);

    const handleChange = (evt) => {
      const { value, name } = evt.target;
      setValues({ ...values, [name]: value });
      setErrors({...errors, [name]: evt.target.validationMessage});
      setIsValid(evt.target.closest('form').checkValidity());
    };
    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);
  
    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}