import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";
import jwtDecode from "jwt-decode";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         inDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async loginAndValidateUser() {
      const emailInput = document.getElementById("login-email-input").value;
      const passwordInput = document.getElementById("login-password-input")
         .value;

      const user = {
         email: emailInput,
         password: passwordInput,
      };

      axios
         .post("/api/v1/users/auth", user)
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
            this.props.history.push("/home");
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
         <div className="mt-5">
            <div className="card">
               <div className="card-body">
                  <div className="landing-card">
                     <h2 className="login-title text-bold pl-2">LOGIN</h2>

                     <div className="form-group" id="login-form">
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
                           id="login-email-input"
                           placeholder="EMAIL ADDRESS"
                           aria-describedby="email-help"
                        />
                        {this.state.hasEmailError && (
                           <div
                              className="alert alert-danger"
                              role="alert"
                              id="login-email-alert"
                           >
                              {this.state.emailError}
                           </div>
                        )}

                        <div className="form-group" id="login-form">
                           <label
                              className="input-text sr-only"
                              htmlFor="password"
                           >
                              Password
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "landing-input": true,
                                 "is-invalid": this.setState.hasPasswordError,
                              })}
                              id="login-password-input"
                              placeholder="PASSWORD"
                              aria-describedby="password-help"
                           />
                           {this.state.hasPasswordError && (
                              <div
                                 className="alert alert-danger"
                                 role="alert"
                                 id="login-password-alert"
                              >
                                 {this.state.passwordError}
                              </div>
                           )}
                        </div>
                        <button
                           to="/home"
                           className="btn landing-submit-button btn-md mt-1"
                           onClick={() => {
                              this.loginAndValidateUser();
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

export default withRouter(connect(mapStateToProps)(LogIn));
