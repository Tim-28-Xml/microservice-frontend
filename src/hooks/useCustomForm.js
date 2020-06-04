import { useState, useEffect, useRef } from "react";

const useCustomForm = ({
  initialValues,
  onSubmit
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [onSubmitting, setOnSubmitting] = useState(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (!formRendered.current) {
      setValues(initialValues);
      setOnSubmitting(false);
    }
    formRendered.current = false;
  }, []);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
};


  const handleSubmit = (event, inputName) => {
    event.preventDefault();
    onSubmit( values , inputName);
  };

  return {
    values,
    handleChange,
    handleSubmit
  };
};

export default useCustomForm;