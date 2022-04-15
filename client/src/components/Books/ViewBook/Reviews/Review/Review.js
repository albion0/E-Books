import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import classes from "./Review.module.css";
import personImg from "../../../../../assets/images/person.jpg";

const Review = (props) => {
  const halfStar = `${props.stars}`.split(".")[1] ? true : false;
  let num = halfStar ? props.stars - 0.5 : props.stars;
  const stars = [];
  for(let i = 0; i < num; i++) stars.push(null);
  const halfStars = [];
  for(let i = 0; i <  5 - num - halfStar ? 1 : 0; i++) halfStars.push(null);

  return (
    <div className={classes.wrapper}>
        <div className={classes.user}>
            <img src={personImg} alt="Person Img" className={classes.img} />
            <p className={classes.name}>{props.name}</p>
        </div>
        
        {stars.map((x, i) => (
          <FaStar key={i} style={{color: '#ffa41c'}} />
        ))}

        {halfStar && <FaStarHalfAlt style={{color: '#ffa41c'}} />}

        {halfStars.map((x, i) => (
          <FaRegStar key={i} style={{color: '#ffa41c'}} />
        ))}

        <p className={classes.title}>{props.title}</p>
        <p className={classes.review}>{props.review}</p>
    </div>
  )
}

export default Review