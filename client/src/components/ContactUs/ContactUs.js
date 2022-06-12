import "./ContactUs.css";

const ContactUs = () => {
  return (
   <div className="bodyp1p2">
       <div className="contact-Container">
                <form className="contact-form">
                        <p classname="p1">Contact Us</p>
                        <p classname="p2">Please ask/suggest us whatever you wish to know and we'll return shortly with an answer.
                        <br/>Thank you for your cooperation!</p>
                        <input type="text"  placeholder="Name" name="name"  className="form-input" />
                        <input type="text"  placeholder="Email" name="email" className="form-input" />
                        <textarea name="description" id="" cols="30" rows="10" placeholder="Message"  className="form-input"></textarea>
                        <input type="submit" name="submit" className="submit-button" value="SUBMIT"/>
                </form>
            </div>
   </div>
  )
}

export default ContactUs