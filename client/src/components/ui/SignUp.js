import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";
import jwtDecode from "jwt-decode";

class Signup extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;

      // Create user obj
      const user = {
         id: getUuid(),
         email: emailInput,
         password: passwordInput,
         createdAt: Date.now(),
      };
      // Post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            // set token in localstorage
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/add-task");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <div className=" mt-5">
            <div className="card">
               <div className="card-body">
                  <div className="landing-card">
                     <h2 className="signup-title text-bold">SIGN UP</h2>
                     <p className="card-text">
                        Sign Up with your email address and password
                     </p>
                     <div className="form-group" id="signup-form">
                        <label className="input-text sr-only" htmlFor="email">
                           Email Address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "landing-input": true,
                              "mb-3": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="signup-email-input"
                           placeholder="EMAIL ADDRESS"
                           aria-describedby="email-help"
                        />
                        {this.state.hasEmailError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="signup-email-alert"
                           >
                              {this.state.emailError}
                           </div>
                        )}
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "landing-input": true,
                              "is-invalid": this.setState.hasPasswordError,
                           })}
                           id="signup-password-input"
                           placeholder="PASSWORD"
                           aria-describedby="password-help"
                        />
                        {this.state.hasPasswordError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="signup-password-alert"
                           >
                              {this.state.passwordError}
                           </div>
                        )}
                        <button
                           to="/add-task"
                           className="btn landing-submit-button btn-md mt-3"
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           SUBMIT
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(Signup));
