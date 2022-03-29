import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import classes from "./Login.module.css";

const Login = () => {
  const [iconPassword, setIconPassword] = useState(false);
  
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <h2 className={classes.heading}>Sign in</h2>
        <p className={classes.title}>Lorem ipsum dolor sit amet, consectetur adipiscing elit anta vis admonitionis inest.</p>
        
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.inputBox}>
            <input type="email" placeholder="Email address" className={classes.input} ref={emailInput} />
            {/* <p className={classes.error}>Email Error</p> */}
          </div>
          <div className={classes.inputBox}>
            <div className={classes.passwordBox}>
              <input type={iconPassword ? 'text' : 'password'} placeholder="Password" ref={passwordInput} />

              <IconContext.Provider value={{ className: classes.icon }}>
                {iconPassword && <AiOutlineEye onClick={() => setIconPassword(state => !state)} />}
                {!iconPassword && <AiOutlineEyeInvisible onClick={() => setIconPassword(state => !state)} />}
              </IconContext.Provider>
            </div>
            {/* <p className={classes.error}>Password Error</p> */}
          </div>

          <input type="checkbox" className={classes.checkbox} />
          <span className={classes.checkboxText}>Remember me</span>

          <button className={classes.btn}>Sign in</button>
        </form>

        <div className={classes.bottom}>
          <p className={classes.text}>Not Registered yet? <NavLink to="/register" className={classes.highlighted}>Register</NavLink></p>
          <span className={classes.line}></span>
          <NavLink to="/forgot-password" className={classes.text}>Forgot password</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login