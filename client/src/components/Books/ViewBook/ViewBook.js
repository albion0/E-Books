import { useState } from "react";

import Reviews from "./Reviews/Reviews";
import Ratings from "./Ratings/Ratings";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classes from "./ViewBook.module.css";
import bookImg from "../../../assets/images/book.png";

import { toastNotification } from "../../../utils/toastNotification";

const ViewBook = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [value, setValue] = useState('');

  const submitHandler = () => {
    if(!value) {
      toastNotification("error", "Form can't be empty.");
    }
  }

  const cancelHandler = () => {
    setValue("");
    setShowFeedback(false);
  }

  return (
    <div className={classes.wrapper}>
        <main className={classes.main}>
            <div className={classes.book}>
                <img src={bookImg} alt="Book Img" className={classes.img} />
                <div className={classes.details}>
                    <h3 className={classes.title}>Book</h3>
                    <p className={classes.author}>Author: John Doe</p>
                    <p className={classes.genree}>Genre: Mystery</p>
                    <p className={classes.price}>Price: 20 Credits</p>
                    <p className={classes.date}>Date: 4/15/2022</p>
                    <p className={classes.reviews}>Total Reviews: 10</p>
                    <button className={classes.btn}>Buy Now</button>
                </div>
            </div>
            <div className={classes.info}>
              <p className={classes.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Bibendum neque egestas congue quisque egestas diam in. Imperdiet proin fermentum leo vel orci porta non pulvinar. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nibh sed pulvinar proin gravida. Dapibus ultrices in iaculis nunc sed augue lacus. Velit ut tortor pretium viverra. Tincidunt tortor aliquam nulla facilisi cras fermentum odio. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Sit amet tellus cras adipiscing enim eu turpis egestas.</p>
              <p className={classes.text}>Mauris sit amet massa vitae. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Tortor at risus viverra adipiscing at in tellus. Etiam erat velit scelerisque in dictum non consectetur. Justo donec enim diam vulputate. Diam quis enim lobortis scelerisque. Felis eget nunc lobortis mattis aliquam. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Nunc sed blandit libero volutpat sed. Turpis massa tincidunt dui ut ornare. Pellentesque habitant morbi tristique senectus et netus et.</p>
              <p className={classes.text}>Sodales ut etiam sit amet nisl purus in. Gravida rutrum quisque non tellus. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Tellus molestie nunc non blandit massa. Ipsum dolor sit amet consectetur adipiscing. Fames ac turpis egestas integer. Maecenas volutpat blandit aliquam etiam erat. Arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc. Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Massa ultricies mi quis hendrerit dolor. Egestas maecenas pharetra convallis posuere morbi leo urna molestie.</p>
            </div>
        </main>

        <section>
          <div className={classes.addReply} style={{display: showFeedback ? 'block' : 'none'}}>
            <div className={classes.addReply}>
              <div className={classes.rating}>
                <p className={classes.ratingText}>Choose your Rating:</p>
                <select name="" id="" className={classes.options}>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                </select>
              </div>

              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                style={{height: "150px"}}
              />
            </div>
            <div className={classes.buttons}>
              <button className={classes.submitBtn} onClick={submitHandler}>Submit</button>
              <button className={classes.clearBtn} onClick={cancelHandler}>Cancel</button>
            </div>
          </div>
          {!showFeedback && <button className={classes.addFeedback} onClick={() => setShowFeedback(true)}>Add Feedback</button>}

          <div className={classes.constumer}>
            <Ratings />
            <Reviews />
          </div>
        </section>
    </div>
  )
}

export default ViewBook