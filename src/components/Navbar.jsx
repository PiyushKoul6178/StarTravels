import { Component } from "react";
import image from "../assets/logo.png";
import searchicon from "../assets/icons8-search.png";
import axios from "axios";

class Navbar extends Component {
  state = {
    loginbutton: "Become a Partner",
    errorlogin: "",
    errorsignup: "",
  };
  render() {
    let onclicklogin = () => {
      let reqemail = document.getElementById("email1").value;
      let reqpassword = document.getElementById("password1").value;
      axios
        .post("http://localhost:5500/login", {
          email: reqemail,
          password: reqpassword,
        })
        .then((response) => {
          document.getElementById("error-login").style.color = "green";
          this.setState({
            errorlogin: "Login Successfull",
            loginbutton: "Welcome " + response.data.credential[0].name,
          });
        })
        .catch((err) => {
          document.getElementById("error-login").style.color = "red";
          this.setState({ errorlogin: err.response.data.message });
        });
    };
    let onclicksignup = () => {
      let reqname = document.getElementById("name").value;
      let reqemail = document.getElementById("email2").value;
      let reqpassword = document.getElementById("password2").value;

      axios
        .post("http://localhost:5500/signup", {
          name: reqname,
          email: reqemail,
          password: reqpassword,
        })
        .then((response) => {
          document.getElementById("error-signup").style.color = "green";
          this.setState({ errorsignup: response.data.message });
        })
        .catch((err) => {
          document.getElementById("error-signup").style.color = "red";
          this.setState({ errorsignup: err.response.data.message });
        });
    };

    return (
      <>
        <div className="navbar-container">
          <img className="logo-image" src={image} />
          <div className="logoname">STAR TRAVELS</div>
          <div className="links-container borderXwidth">
            <a className="links">HOME</a>
            <a className="links">FLIGHTS</a>
            <a className="links">HOTELS</a>
            <a className="links">CAR RENTALS</a>
            <a className="links">CONTACT US</a>
          </div>
          <div className="search-icon-div">
            <img src={searchicon} />
          </div>

          <button
            type="button"
            className="btn btn-outline-primary navbar-button"
            data-toggle="modal"
            data-target="#loginModal"
          >
            {this.state.loginbutton}
          </button>
          <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-bottom-0">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-title text-center">
                    <h4>Login</h4>
                  </div>
                  <div className="d-flex flex-column text-center">
                    <form action="" method="post" target="_blank">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-email"
                          id="email1"
                          placeholder="Your email address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-password"
                          id="password1"
                          placeholder="Your password..."
                        />
                      </div>
                      <div className="form-group" id="error-login">
                        {this.state.errorlogin}
                      </div>
                      <button
                        type="button"
                        formTarget="_self"
                        id="login-button-modal"
                        onClick={onclicklogin}
                        className="btn btn-info btn-block btn-round login-button-modal"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <div className="signup-section">
                    Not a member yet?{" "}
                    <button
                      type="button"
                      className="signup-button"
                      data-toggle="modal"
                      data-target="#signupModal"
                    >
                      Signup
                    </button>
                  </div>
                </div>

                <div
                  className="modal fade"
                  id="signupModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header border-bottom-0">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-title text-center">
                          <h4>Signup</h4>
                        </div>
                        <div className="d-flex flex-column text-center">
                          <form>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control form-control-text"
                                id="name"
                                placeholder="Your name..."
                              />
                            </div>

                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control form-control-email"
                                id="email2"
                                placeholder="Your email address..."
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="password"
                                className="form-control form-control-password"
                                id="password2"
                                placeholder="Your password..."
                              />
                            </div>
                            <div id="error-signup">
                              {this.state.errorsignup}
                            </div>
                            <button
                              type="button"
                              onClick={onclicksignup}
                              className="btn btn-info btn-block btn-round login-button-modal"
                            >
                              Signup
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="modal-footer d-flex justify-content-center">
                        <div className="signup-section">
                          Already a member?{" "}
                          <button
                            type="button"
                            className="btn signup-button"
                            data-toggle="modal"
                            data-target="#loginModal"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Navbar;
