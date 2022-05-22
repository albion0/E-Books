import "./ContactUs.css";

const ContactUs = () => {
  return (
   <div>
       <div className="contact-Container">
                <form className="contact-form">
                        <p>Contact Us</p>
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