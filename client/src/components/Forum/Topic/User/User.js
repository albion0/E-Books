import classes from "./User.module.css";
import personImg from "../../../../assets/images/person.jpg";

const User = () => {
  return (
    <div className={classes.user}>
        <div className={classes.picture}>
          <img src={personImg} alt="Person" className={classes.img} />
        </div>
        <p className={classes.username}>John Doe</p>
        <p className={classes.account}>Member</p>
        <div className={classes.row}>
        <p className={classes.text}>Posts:</p>
        <p className={classes.value}>120</p>
        </div>
        <div className={classes.row}>
        <p className={classes.text}>Replies:</p>
        <p className={classes.value}>200</p>
        </div>
    </div>
  )
}

export default User