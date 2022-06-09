import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toastNotification } from "../../../../utils/toastNotification";

import classes from "./AddReply.module.css";

const AddReply = () => {
  const [value, setValue] = useState('');

  const submitHandler = () => {
    if(!value) {
      toastNotification("error", "Form can't be empty.");
    }
  }

  const clearHandler = () => {
    setValue("");
  }

  return (
    <div className={classes.addReply}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className={classes.buttons}>
        <button className={classes.submitBtn} onClick={submitHandler}>Submit</button>
        <button className={classes.clearBtn} onClick={clearHandler}>Clear</button>
      </div>
    </div>
  )
}

export default AddReply