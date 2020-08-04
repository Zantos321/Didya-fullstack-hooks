import React from "react";
import BodyTemplate from "../ui/BodyTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { MAX_CHAR_COUNT } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";
import axios from "axios";

class AddTask extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         task: "",
      };
   }

   checkIsInvalidCharLimit() {
      if (
         this.state.task.length > MAX_CHAR_COUNT ||
         this.state.task.length === 0
      ) {
         return true;
      } else return false;
   }

   setTaskText(e) {
      this.setState({ task: e.target.value });
   }

   // TODO: on success, fire overlay
   // TODO: on error, fire overlay
   async setCreatableTask() {
      if (!this.checkIsInvalidCharLimit()) {
         let newTask = {
            id: getUuid(),
            text: this.state.task,
            userId: this.props.currentUser.id,
            isCompleted: 0,
            lastDoneAt: Date.now(),
            timesCompleted: 0,
         };
         await this.props.dispatch({
            type: actions.UPDATE_CREATABLE_TASK,
            payload: {
               id: getUuid(),
               text: this.state.task,
               userId: this.props.currentUser.id,
               isCompleted: 0,
               lastDoneAt: Date.now(),
               timesCompleted: 0,
            },
         });
         axios
            .post("/api/v1/tasks", newTask)
            .then((res) => {
               console.log("Task Created");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
            });
         this.props.history.push("/all-tasks");
      }
   }

   render() {
      return (
         <BodyTemplate>
            <h3 className="pl-2 mt-3 ml-2">ADD TASK</h3>
            <div className="row mb-4 ml-3">
               <h6 className="text-muted">
                  {" "}
                  TASK SHOULD TAKE LESS THAN 15 MINUTES{" "}
               </h6>
            </div>
            <div className="col">
               <textarea
                  rows="4"
                  autoFocus={true}
                  defaultValue=""
                  className="editTaskTextArea"
                  onChange={(e) => this.setTaskText(e)}
               ></textarea>
            </div>
            <div className="row float-right">
               <p className="text-muted mr-5">
                  <span
                     className={classnames({
                        "text-danger": this.checkIsInvalidCharLimit(),
                     })}
                  >
                     {this.state.task.length}/{MAX_CHAR_COUNT}
                  </span>
               </p>
            </div>
            <div className="clearfix"></div>
            <div className="col">
               <div className="row justify-content-between mb-4">
                  <Link to="/all-tasks" className="btn edit-cancel col-4 ml-4">
                     CANCEL
                  </Link>

                  <button
                     to="/all-tasks"
                     className={classnames("btn edit-save col-4 mr-4", {
                        disabled: this.checkIsInvalidCharLimit(),
                     })}
                     onClick={() => {
                        this.setCreatableTask();
                     }}
                  >
                     SAVE
                  </button>
               </div>
            </div>
         </BodyTemplate>
      );
   }
}

function mapStateToProps(state) {
   return { currentUser: state.currentUser, tasks: state.tasks };
}

export default connect(mapStateToProps)(AddTask);
