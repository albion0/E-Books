import Footer from "../Footer/Footer";
import classes from "./ContactUs.module.css";
import { useState } from "react";
import Api from "../../api";
import "./contactus.scss";
//import "./ContactUs.css";

const ContactUs = () => {
  const [isSuccess, setSuccess] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      email: email,
      description: description,
    };

    Api("auth/sendEmail", "POST", body)
      .then(() => setSuccess("Email sent successfully, thank you!"))
      .catch((err) => {});
  };

  return (
    <div id="contactus" className="cotainer-contact-us">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="sec-heading">
              <h6 class="contactTitle">eBooks</h6>
              <h2>CONTACT</h2>
              <p>You can email us, or use the form below to reach us faster</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-7">
            <div className="contact-form">
              {isSuccess && (
                <h5 style={{ margin: "20px 0", color: "green" }}>
                  {isSuccess}
                </h5>
              )}

              <form id="ajax-contact" onSubmit={handleSubmit}>
                <div className="form-group has-error has-danger">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required="required"
                    data-error="name is required."
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required="required"
                    data-error="valid email is required."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="help-block with-errors"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="8"
                    placeholder="Message"
                    required="required"
                    data-error="Please, leave us a message."
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="help-block with-errors"></div>
                </div>
                <button type="submit" className="disabled">
                  Send
                </button>
                <div className="messages"></div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="cont-info">
              <div className="cont-info-single">
                <h5>
                  <i className="icofont-google-map"></i> Address:
                </h5>
                <p>
                  Agim Ramadani, <br /> Pristina
                </p>
              </div>
              <div className="cont-info-single">
                <h5>
                  <i className="icofont-email"></i> Email:
                </h5>
                <p>info@ebooks.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
