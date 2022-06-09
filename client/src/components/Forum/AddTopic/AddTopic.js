import { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toastNotification } from "../../../utils/toastNotification";

import classes from "./AddTopic.module.css";

const AddTopic = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("default");

    const submitHandler = () => {
        console.log(title, content, category);
        if(!title && !content && category === 'default') {
            toastNotification("error", "Please fill out all the fields.")
        }
    }

  return (
    <div className={classes.wrapper}>
        <div className={classes.title}>
            <p className={classes.fieldTitle}>Title</p>
            <input
                type="text"
                className={classes.input}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className={classes.content}>
            <p className={classes.fieldName}>Content</p>
            <ReactQuill
                theme="snow"
                value={content}
            />
        </div>
        <div className={classes.category}>
            <p className={classes.fieldCategory}>Category</p>
            <select name="options" id="" onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="default">Select:</option>
                <option value="mystery">Mystery</option>
                <option value="drama">Drama</option>
                <option value="others">Others</option>
            </select>
        </div>
        <button className={classes.btn} onClick={submitHandler}>Add Topic</button>
    </div>
  )
}

export default AddTopic