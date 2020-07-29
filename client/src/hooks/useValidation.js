import { useState } from "react";
import _ from "lodash";

function useValidation() {
  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});

  function validateEmail(value) {
    const emailReg = /\S+@\S+\.\S+/;
    const test = emailReg.test(value.toLowerCase());
    setIsEmail(test);
    if (!test) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        email: "Formatul email-ului nu este valid.",
      }));
      return false;
    }
    return true;
  }

  function validatePassword(value) {
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const test = passwordReg.test(value);
    setIsPassword(test);
    if (!test) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        password:
          "Parola trebuie să aibă cel puțin opt caractere și să conțină cel puțin o literă mică, o majusculă, o cifră și un caracter special @$!%*?&",
      }));
      return false;
    }
    return true;
  }

  function validateName(value) {
    if (!value.length || value.length < 2) {
      setIsName(false);
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        name: "Numele trebuie să conțină cel puțin 2 caractere.",
      }));
      return false;
    }
    return true;
  }

  function displayErrorMessage(name, value) {
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: value,
    }));
  }

  function clearError(name) {
    if (name === "email") setIsEmail(true);
    if (name === "password") setIsPassword(true);
    if (name === "name") setIsName(true);
    setErrorMessage((prevErrors) => _.omit(prevErrors, name));
  }

  return {
    isName,
    isEmail,
    isPassword,
    validateName,
    validateEmail,
    validatePassword,
    errorMessage,
    displayErrorMessage,
    clearError,
  };
}

export default useValidation;
