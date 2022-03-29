import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import classes from "./Register.module.css";

const Register = () => {
  const [iconPassword, setIconPassword] = useState(false);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(false);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const emailInput = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const { value: username } = usernameInput.current;
    const { value: password } = passwordInput.current;
    const { value: confirmPassword } = passwordInput.current;
    const { value: email } = emailInput.current;

    console.log(email);

    fetch("http://localhost:5000/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, confirmPassword, email})
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.register}>
        <h2 className={classes.heading}>Sign up</h2>
        <p className={classes.title}>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit anta vis admonitionis inest.</p>
        
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.inputBox}>
            <input type="text" placeholder="Username" className={classes.input} ref={usernameInput} />
            {/* <p className={classes.error}>Username Error</p> */}
          </div>
          <div className={classes.inputBox}>
            <input type="email" placeholder="Email address" className={classes.input} ref={emailInput} />
            {/* <p className={classes.error}>Email Error</p> */}
          </div>
          <div className={classes.inputBox}>
            <div className={classes.passwordBox}>
              <input type={iconPassword ? 'text' : 'password'} placeholder="Password" ref={passwordInput}/>

              <IconContext.Provider value={{ className: classes.icon }}>
                {iconPassword && <AiOutlineEye onClick={() => setIconPassword(state => !state)} />}
                {!iconPassword && <AiOutlineEyeInvisible onClick={() => setIconPassword(state => !state)} />}
              </IconContext.Provider>
            </div>
            {/* <p className={classes.error}>Password Error</p> */}
          </div>
          <div className={classes.inputBox}>
            <div className={classes.passwordBox}>
              <input type={iconConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" ref={confirmPasswordInput} />

              <IconContext.Provider value={{ className: classes.icon }}>
                {iconConfirmPassword && <AiOutlineEye onClick={() => setIconConfirmPassword(state => !state)} />}
                {!iconConfirmPassword && <AiOutlineEyeInvisible onClick={() => setIconConfirmPassword(state => !state)} />}
              </IconContext.Provider>
            </div>
            {/* <p className={classes.error}>Password Error</p> */}
          </div>

          <button className={classes.btn}>Sign up</button>
        </form>

        <div className={classes.bottom}>
          <p className={classes.text}>Already have an account? <NavLink to="/login" className={classes.highlighted}>Login</NavLink></p>
        </div>
      </div>
    </div>
  )
}

export default Register