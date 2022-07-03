import classes from "./About.module.css";
import Footer from "../Footer/Footer";
import ContactUs from "../ContactUs/ContactUs";
const About = () => {
  return (
    <div>
      <body className={classes.ourcompany}>
        <div className={classes.aboutsection}>
          <div className={classes.innercontainer}>
            <h1>What is this website all about?</h1>
            <p className={classes.text}>
              We've began our mission by creating this company with the hope to
              re-spread awareness about the importance of reading books and
              being in touch with "knowledge" in overall because as we know the
              world has made a huge shift towards technology and people have
              kinda lost touch with reading so we've seen fit to integrate
              technology and reality by creating an internet application in
              ever-service for all those who want and love reading books by
              doing so, all online. With the hope that we can remind you of the
              importance of reading books, we invite you to use our community as
              an escape from the daily challenges into the fantasy of reading!
            </p>
            <div className={classes.skills}>
              <span>How many books have you read this month?</span>
              <span>Which books have you been putting off?</span>
              <span></span>
            </div>
          </div>
        </div>
      </body>
      <ContactUs />
      {/* <div className={classes.bodyp1p2}>
        <div className={classes.contactcontainer}>
          <form className={classes.contactform}>
            <p classname={classes.p1}>Contact Us</p>
            <p classname={classes.p2}>
              Please ask/suggest us whatever you wish to know and we'll return
              shortly with an answer.
              <br />
              Thank you for your cooperation!
            </p>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className={classes.forminput}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className={classes.forminput}
            />
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              placeholder="Message"
              className={classes.forminput}
            ></textarea>
            <input
              type="submit"
              name="submit"
              className={classes.submitbutton}
              value="Send Message"
            />
          </form>
        </div>
      </div> */}
      <Footer />
    </div>
    /*
        <div class="about">
            <div className="container text-center">
                <br/>
                <b><i><h2 className="thin">The best place to tell people why we're here</h2></i></b>
                <p className="text-muted">
                    The difference between involvement and commitment is like an eggs-and-ham breakfast:<br/>
                    the chicken was <b>involved</b>, the pig was <b><i>commited.</i></b>
                </p>
            </div>
            <div className="jumbotron top-space">
                <div className="container">
                    <b><i><h3 className="text-center thin">~ What makes this community tick? ~</h3></i></b><br/><br/>
                    <div className="row">
                        <div class="col-md-3 col-sm-6 highlight">
                            <div class="h-caption"><h4>Company</h4></div>
                            <div class="h-body text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aliquid adipisci aspernatur. Soluta quisquam dignissimos earum quasi voluptate. Amet, dignissimos, tenetur vitae dolor quam iusto assumenda hic reprehenderit!</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 highlight">
                            <div class="h-caption"><h4>Project</h4></div>
                            <div class="h-body text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi, sequi quis ad fugit omnis cumque a libero error nesciunt molestiae repellat quos perferendis numquam quibusdam rerum repellendus laboriosam reprehenderit! </p>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 highlight">
                            <div class="h-caption"><h4>Legacy</h4></div>
                            <div class="h-body text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, vitae, perferendis, perspiciatis nobis voluptate quod illum soluta minima ipsam ratione quia numquam eveniet eum reprehenderit dolorem dicta nesciunt corporis!</p>
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-6 highlight">
                            <div class="h-caption"><h4>Revenue</h4></div>
                            <div class="h-body text-center">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, excepturi, maiores, dolorem quasi reprehenderit illo accusamus nulla minima repudiandae quas ducimus reiciendis odio sequi atque temporibus facere corporis eos expedita!</p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    */
  );
};

export default About;
