import User from "./User/User";
import Replies from "./Replies/Replies";
import AddReply from "./AddReply/AddReply";

import classes from "./Topic.module.css";

const Topic = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.topic}>
        <User />
        <div className={classes.content}>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
          <p className={classes.text}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolore aliquid eveniet dolorum est, vero ea ut sunt sapiente nostrum. Velit, illum consectetur. Consectetur natus ab modi veniam explicabo harum?</p>
        
          <p className={classes.date}>15 April, 2022</p>
        </div>
      </div>

      <AddReply />
      <Replies />
    </div>
  )
}

export default Topic