import {useState} from 'react';
 
function useValidForm() {
  const [ values, setValues ] = useState({});
  const [ isValid, setIsValid ] = useState(true);
  const handleChange = (evt) => {
    const {name, value} = evt.target
    setValues({...values, [name]: value });
    setIsValid(evt.target.closest('form').checkValidity());
  };
  return { values, handleChange, isValid, setValues, setIsValid };
}
export { useValidForm }