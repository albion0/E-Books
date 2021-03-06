import { NavLink } from "react-router-dom";
import classes from "./Book.module.css";

const Book = (props) => {
  return (
    <div className={classes.book}>
      <img src={props.img} alt="Book img" className={classes.img} />
      <div className={classes.main}>
        <h4 className={classes.title}>{props.title}</h4>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{
            __html:
              props?.desc?.length > 150
                ? props.desc.slice(0, 151) + "..."
                : props.desc,
          }}
        ></div>
        <div className={classes.bottom}>
          <p className={classes.price}>{props.price} Credits</p>
          <NavLink to={`/books/${props.id}`} className={classes.btn}>
            View More
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Book;
