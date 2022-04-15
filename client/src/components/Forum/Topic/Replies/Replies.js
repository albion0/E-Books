import Reply from "./Reply/Reply";
import classes from "./Replies.module.css";

const replies = [];

for(let i = 1; i <= 5; i++) {
  replies.push({
    id: 'id' + i,
    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque tempora harum totam, dicta quo enim quae. Distinctio error vero ut, omnis libero quos aspernatur quasi esse neque saepe perferendis. Odit."
  })
}

const Replies = () => {
  return (
    <div className={classes.replies}>
      {replies.map(reply => (
        <Reply key={reply.id} content={reply.content}/>
      ))}
    </div>
  )
}

export default Replies