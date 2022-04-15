import User from "../../User/User";
import classes from "./Reply.module.css";

const Reply = (props) => {
  return (
    <div className={classes.wrapper}>
        <User />
        <div className={classes.content}>
            <p className={classes.text}>{props.content}</p>
            <p className={classes.text}>{props.content}</p>
            <p className={classes.date}>15 April, 2022</p>
        </div>
    </div>
  )
}

export default Reply