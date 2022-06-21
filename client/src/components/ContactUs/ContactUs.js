import classes from "./ContactUs.module.css";
//import "./ContactUs.css";

const ContactUs = () => {
  return (
   <div className={classes.bodyp1p2}>
       <div className={classes.contactcontainer}>
                <form className={classes.contactform}>
                        <p classname={classes.p1}>Contact Us</p>
                        <p classname={classes.p2}>Please ask/suggest us whatever you wish to know and we'll return shortly with an answer.
                        <br/>Thank you for your cooperation!</p>
                        <input type="text"  placeholder="Name" name="name"  className={classes.forminput} />
                        <input type="text"  placeholder="Email" name="email" className={classes.forminput} />
                        <textarea name="description" id="" cols="30" rows="10" placeholder="Message"  className={classes.forminput}></textarea>
                        <input type="submit" name="submit" className={classes.submitbutton} value="SUBMIT"/>
                </form>
            </div>
   </div>
  )
}

export default ContactUs