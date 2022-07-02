import classes from "./User.module.css";
import personImg from "../../../../assets/images/person.jpg";

const User = ({ forumTopic }) => {
  return (
    <div className={classes.user}>
      <div className={classes.picture}>
        <img src={personImg} alt="Person" className={classes.img} />
      </div>
      <p className={classes.username}>
        {forumTopic && forumTopic.user ? forumTopic.user.username : "NA"}
      </p>
      <p className={classes.account}>Member</p>
    </div>
  );
};

export default User;
