import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import classes from "./Ratings.module.css";

const Ratings = () => {
  return (
    <div className={classes.wrapper}>
      <h4 className={classes.heading}>Customer reviews</h4>
      <div className={classes.stars}>
        <FaStar style={{color: '#ffa41c'}} />
        <FaStar style={{color: '#ffa41c'}} />
        <FaStar style={{color: '#ffa41c'}} />
        <FaStar style={{color: '#ffa41c'}} />
        <FaStarHalfAlt style={{color: '#ffa41c'}} />
        <p className={classes.text}>4.5 out of 5</p>
      </div>

      <div className={classes.star}>
        <p className={classes.txt}>5 Star</p>
        <div className={classes.line}>
          <div className={classes.filled}></div>
        </div>
        <div className={classes.percent}>76%</div>
      </div>
      <div className={classes.star}>
        <p className={classes.txt}>4 Star</p>
        <div className={classes.line}>
          <div className={classes.filled}></div>
        </div>
        <div className={classes.percent}>76%</div>
      </div>
      <div className={classes.star}>
        <p className={classes.txt}>3 Star</p>
        <div className={classes.line}>
          <div className={classes.filled}></div>
        </div>
        <div className={classes.percent}>76%</div>
      </div>
      <div className={classes.star}>
        <p className={classes.txt}>2 Star</p>
        <div className={classes.line}>
          <div className={classes.filled}></div>
        </div>
        <div className={classes.percent}>76%</div>
      </div>
      <div className={classes.star}>
        <p className={classes.txt}>1 Star</p>
        <div className={classes.line}>
          <div className={classes.filled}></div>
        </div>
        <div className={classes.percent}>76%</div>
      </div>
    </div>
  )
}

export default Ratings