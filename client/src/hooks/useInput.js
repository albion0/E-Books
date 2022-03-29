import { useState } from "react";

const useInput = (getData) => {
  const [value, setValue] = useState("");
  const [focusOut, setFocusOutInput] = useState(false);

  const { filter, errorMsg: error } = getData();

  const validity = filter(value);

  const changeHandler = (e) => {
    setValue(e.target.value);
  }

  const focusHandler = () => {
    setFocusOutInput(false);
  }

  const blurHandler = (e) => {
    setFocusOutInput(true);
  }

  return {
    value,
    validity,
    focusOut,
    error,
    changeHandler,
    focusHandler,
    blurHandler
  }
}

export default useInput