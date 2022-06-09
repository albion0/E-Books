import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import useInput from "../../hooks/useInput";
import classes from "./Register.module.css";
import { validateUsername, validatePassword, validateEmail } from "../../helpers/helpers";

const Register = () => {
  const [iconPassword, setIconPassword] = useState(false);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(false);
  const {
    value: usernameValue,
    validity: usernameValidity,
    focusOut: usernameFocusOut,
    error: usernameError,
    changeHandler: usernameChangeHandler,
    focusHandler: usernameFocusHandler,
    blurHandler: usernameBlurHandler
  } = useInput(validateUsername);
  const {
    value: emailValue,
    validity: emailValidity,
    focusOut: emailFocusOut,
    error: emailError,
    changeHandler: emailChangeHandler,
    focusHandler: emailFocusHandler,
    blurHandler: emailBlurHandler
  } = useInput(validateEmail);
  const {
    value: passwordValue,
    validity: passwordValidity,
    focusOut: passwordFocusOut,
    error: passwordError,
    changeHandler: passwordChangeHandler,
    focusHandler: passwordFocusHandler,
    blurHandler: passwordBlurHandler
  } = useInput(validatePassword);
  const {
    value: confirmPasswordValue,
    validity: confirmPasswordValidity,
    focusOut: confirmPasswordFocusOut,
    error: confirmPasswordError,
    changeHandler: confirmPasswordChangeHandler,
    focusHandler: confirmPasswordFocusHandler,
    blurHandler: confirmPasswordBlurHandler
  } = useInput(validatePassword);

  const submitHandler = (e) => {
    e.preventDefault();

    const formValidity = usernameValidity && passwordValidity && confirmPasswordValidity && emailValidity;

    if(formValidity) {
      fetch("http://localhost:5000/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
          passwordConfirm: confirmPasswordValue,
          email: emailValue,
          credits: "0"
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.register}>
        <h2 className={classes.heading}>Sign up</h2>
        <p className={classes.title}>Lorem ipsum dolor sit amet, consectetur adipiscing<br/> elit anta vis admonitionis inest.</p>
        
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.inputBox}>
            <input
              type="text"
              placeholder="Username"
              className={classes.input}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              onFocus={usernameFocusHandler}
            />
            {!usernameValidity && usernameFocusOut && <p className={classes.error}>{usernameError}</p>}
          </div>
          <div className={classes.inputBox}>
            <input
              type="email"
              placeholder="Email address"
              className={classes.input}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              onFocus={emailFocusHandler}
            />
            {!emailValidity && emailFocusOut && <p className={classes.error}>{emailError}</p>}
          </div>
          <div className={classes.inputBox}>
            <div className={classes.passwordBox}>
              <input
                type={iconPassword ? 'text' : 'password'}
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                onFocus={passwordFocusHandler}
              />

              <IconContext.Provider value={{ className: classes.icon }}>
                {iconPassword && <AiOutlineEye onClick={() => setIconPassword(state => !state)} />}
                {!iconPassword && <AiOutlineEyeInvisible onClick={() => setIconPassword(state => !state)} />}
              </IconContext.Provider>
            </div>
            {!passwordValidity && passwordFocusOut && <p className={classes.error}>{passwordError}</p>}
          </div>
          <div className={classes.inputBox}>
            <div className={classes.passwordBox}>
              <input
                type={iconConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                onFocus={confirmPasswordFocusHandler}
              />

              <IconContext.Provider value={{ className: classes.icon }}>
                {iconConfirmPassword && <AiOutlineEye onClick={() => setIconConfirmPassword(state => !state)} />}
                {!iconConfirmPassword && <AiOutlineEyeInvisible onClick={() => setIconConfirmPassword(state => !state)} />}
              </IconContext.Provider>
            </div>
            {!confirmPasswordValidity && confirmPasswordFocusOut && <p className={classes.error}>{confirmPasswordError}</p>}
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