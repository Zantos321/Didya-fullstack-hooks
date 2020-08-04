import React from "react";
import BodyTemplate from "../ui/BodyTemplate";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { MAX_CHAR_COUNT } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import actions from "../../store/actions";
import axios from "axios";
import without from "lodash/without";

class EditTasks extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         text: this.props.editableTask.task.text,
         checked: false,
      };
   }

   checkIsInvalidCharLimit() {
      if (
         this.state.text.length > MAX_CHAR_COUNT ||
         this.state.text.length === 0
      ) {
         return true;
      } else return false;
   }

   setTaskText(e) {
      this.setState({ text: e.target.value });
   }

   showDeleteButton() {
      this.setState({
         checked: !this.state.checked,
      });
   }

   saveTask() {
      if (!this.checkIsInvalidCharLimit()) {
         const task = { ...this.props.editableTask.task };
         task.text = this.state.text;
         console.log(task);

         // db put changes to card in our axios req
         axios
            .put(`/api/v1/tasks/${task.id}`, task)
            .then((res) => {
               console.log("Task Updated");
               const editedTasks = [...this.props.tasks];
               this.props.dispatch({
                  type: actions.STORE_QUEUED_TASKS,
                  payload: editedTasks,
               });
               this.props.history.push("/all-tasks");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
            });
      }
   }

   deleteTask() {
      const task = { ...this.props.editableTask.task };
      axios
         .delete(`/api/v1/tasks/${task.id}`)
         .then((res) => {
            console.log(res.data);
            console.log("Task Deleted");
            const deletedTask = this.props.editableTask.task;
            const tasks = this.props.tasks;
            const filteredTasks = without(tasks, deletedTask);
            this.props.dispatch({
               type: actions.STORE_QUEUED_TASKS,
               payload: filteredTasks,
            });
            this.props.history.push("/all-tasks");
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   }

   // TODO: make edit and delete buttons work

   render() {
      return (
         <BodyTemplate>
            <h3 className="pl-2 mt-3 ml-2">EDIT TASK</h3>
            <div className="row mb-4 ml-3">
               <h6 className="text-muted">
                  {" "}
                  TASK SHOULD TAKE LESS THAN 15 MINUTES{" "}
               </h6>
            </div>

            {isEmpty(this.props.editableTask) === false && (
               <>
                  <div className="col">
                     <textarea
                        rows="4"
                        autoFocus={true}
                        defaultValue={this.props.editableTask.task.text}
                        className="editTaskTextArea"
                        onChange={(e) => this.setTaskText(e)}
                     ></textarea>
                     <div className="row justify-content-between">
                        <p className="text-muted mr-1 ml-3">
                           Last Time Completed:{" "}
                           {toDisplayDate(
                              this.props.editableTask.task.lastDoneAt,
                              " MMM. d, y"
                           )}
                        </p>

                        <p className="text-muted mr-3">
                           <span
                              className={classnames({
                                 "text-danger": this.checkIsInvalidCharLimit(),
                              })}
                           >
                              {this.state.text.length}/{MAX_CHAR_COUNT}
                           </span>
                        </p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="row justify-content-between mb-4">
                        <Link
                           to={this.props.editableTask.prevRoute}
                           className="btn edit-cancel col-4 ml-4"
                        >
                           CANCEL EDIT
                        </Link>
                        <button
                           className={classnames("btn edit-save col-4 mr-4", {
                              disabled: this.checkIsInvalidCharLimit(),
                           })}
                           onClick={() => this.saveTask()}
                        >
                           SAVE EDIT
                        </button>
                     </div>
                  </div>
                  <div className="custom-control custom-checkbox">
                     <div className="row col-auto mb-4">
                        <div className="custom-control custom-checkbox ">
                           <input
                              type="checkbox"
                              className="custom-control-input delete-verify"
                              id="delete-check"
                              checked={this.state.checked}
                              onChange={() => {
                                 this.showDeleteButton();
                              }}
                           />
                           <label
                              className="custom-control-label delete-verify"
                              htmlFor="delete-check"
                           >
                              Show delete button
                           </label>
                        </div>
                     </div>
                     {this.state.checked && (
                        <button
                           className="btn btn-large btn-danger "
                           id="card-delete"
                           onClick={() => {
                              this.deleteTask();
                           }}
                        >
                           DELETE THIS TASK
                        </button>
                     )}
                  </div>
               </>
            )}
         </BodyTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableTask: state.editableTask,
      tasks: state.tasks,
   };
}

export default connect(mapStateToProps)(EditTasks);
