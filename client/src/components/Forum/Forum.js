import classes from "./Forum.module.css";
import personImg from "../../assets/images/person.jpg";

const Forum = () => {
  return (
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Replies</td>
            <td>Last Post</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
          <tr>
            <td className={classes.user}>
              <img src={personImg} alt="Person img" className={classes.img} />
              <div>
                <p className={classes.title}>Lorem ipsum dolor sit</p>
                <p className={classes.username}>John</p>
              </div>
            </td>
            <td>
              <p className={classes.text}>19</p>
            </td>
            <td>
              <p className={classes.text}>User99</p>
              <p className={classes.date}>4/02/2022</p>
            </td>
            <td>
              <p className={classes.text}>Friday, 15 April, 2022</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Forum