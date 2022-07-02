import User from "../../User/User";
import classes from "./Reply.module.css";
import moment from "moment";

const Reply = ({ forumComment }) => {
  return (
    <div className={classes.wrapper}>
      <User forumTopic={forumComment} />
      <div className={classes.content}>
        <p
          className={classes.text}
          dangerouslySetInnerHTML={{ __html: forumComment.text }}
        ></p>

        <p className={classes.date}>
          {" "}
          {moment(forumComment.createdAt).format(
            "dddd, MMMM Do YYYY, h:mm:ss a"
          )}
        </p>
      </div>
    </div>
  );
};

export default Reply;
