import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";

import classes from "./ForgotPassword.module.css";
import useInput from "../../hooks/useInput";
import { validateEmail } from "../../helpers/helpers";

const Login = () => {
  const {
    value,
    validity,
    focusOut,
    error,
    changeHandler,
    focusHandler,
    blurHandler
  } = useInput(validateEmail);

  const submitHandler = (e) => {
    e.preventDefault();

    if(validity) {
      console.log(value);
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.login}>
        <h2 className={classes.heading}>Reset Password</h2>
        <p className={classes.title}>Enter your email address and we'll send you a link to reset your password.</p>
        
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.inputBox}>
            <input
              type="email"
              placeholder="Email address"
              className={classes.input} 
              onChange={changeHandler}
              onFocus={focusHandler}
              onBlur={blurHandler} />
            {!validity && focusOut && <p className={classes.error}>{error}</p>}
          </div>

          <button className={classes.btn}>Request reset link</button>
        </form>

        <div className={classes.bottom}>
          <p className={classes.text}>
            <IconContext.Provider value={{className: classes.icon}}>
              <BsArrowLeft />
            </IconContext.Provider >
            Back to the <NavLink to="/login" className={classes.highlighted}>Login screen</NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login