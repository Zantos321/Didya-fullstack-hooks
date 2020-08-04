import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import BodyTemplate from "../ui/BodyTemplate";
import diyaDots from "../../images/DIDYA-Logo-PURPLE-dotdotdot.svg";
import { YesIcon } from "../../icons/Icons";
import { NoIcon } from "../../icons/Icons";
import shuffle from "lodash/shuffle";
import without from "lodash/without";

class HomePage extends React.Component {
   originalTaskList;

   constructor(props) {
      super(props);
      if (props.tasks.length === 0) {
         axios
            .get(`/api/v1/tasks?`)
            .then((res) => {
               // handle success
               console.log(res);
               this.originalTaskList = res.data;
               const shuffledTasks = shuffle(res.data);
               console.log({ shuffledTasks });
               props.dispatch({
                  type: actions.STORE_QUEUED_TASKS,
                  payload: shuffledTasks,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
      }
   }

   // TODO: when all tasks completed, fire congrats? overlay
   // TODO:
   // TODO: (MVP 2)
   // TODO: optimize better for desktop

   goToNextTask() {
      // TODO make it randomly display a task
      const removedTask = this.props.tasks[0];
      const tasks = this.props.tasks;
      const filteredTasks = without(tasks, removedTask);
      this.props.dispatch({
         type: actions.STORE_QUEUED_TASKS,
         payload: filteredTasks,
      });
      if (filteredTasks[0] === undefined || filteredTasks[0] === "") {
         this.props.dispatch({
            type: actions.RESET_TASK_QUEUE,
            payload: shuffle(this.originalTaskList),
         });
      }
   }

   render() {
      const currentTask = this.props.tasks[0];
      return (
         <BodyTemplate>
            <div className="row col-12">
               <img
                  src={diyaDots}
                  alt="Didya..."
                  className="image-fluid ml-1 mt-4 text-center"
                  id="didyaDots"
               />
            </div>
            <div className="row col-12 justify-content-center mb-4">
               <div className="card didyaCard col-8 mb-4">
                  <div className="card-body">
                     <h4 className="card-text didyaText">
                        {currentTask && currentTask.text}
                     </h4>
                  </div>
               </div>
            </div>
            <div className="row d-flex justify-content-around">
               <button
                  className="yesButton"
                  onClick={() => this.goToNextTask()}
               >
                  <YesIcon className="yesIcon" />
               </button>
               <button className="noButton" onClick={() => this.goToNextTask()}>
                  <NoIcon className="noIcon" />
               </button>
            </div>
         </BodyTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      tasks: state.tasks,
   };
}

export default connect(mapStateToProps)(HomePage);
