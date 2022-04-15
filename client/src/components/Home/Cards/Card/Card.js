import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.card}>
      <img src={props.img} alt="Book img" className={classes.img} />
      <div className={classes.main}>
        <h4 className={classes.title}>{props.title}</h4>
        <p className={classes.description}>{props.desc}</p>
        <div className={classes.bottom}>
          <p className={classes.price}>{props.price} Credits</p>
          <button className={classes.btn}>View More</button>
        </div>
      </div>
    </div>
  )
}

export default Card