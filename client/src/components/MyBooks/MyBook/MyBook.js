import classes from "./MyBook.module.css";

const MyBook = (props) => {
  return (
    <div className={classes.book}>
      <img src={props.img} alt="Book img" className={classes.img} />
      <div className={classes.main}>
        <h4 className={classes.title}>{props.title}</h4>
        <p className={classes.description}>{props.desc}</p>
        <button className={classes.btn}>Read</button>
      </div>
    </div>
  )
}

export default MyBook