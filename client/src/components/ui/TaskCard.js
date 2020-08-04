import React from "react";
import { Link } from "react-router-dom";
import { EditIcon } from "../../icons/Icons";
import actions from "../../store/actions";
import { connect } from "react-redux";

class TaskCard extends React.Component {
   storeEditableTask() {
      this.props.dispatch({
         type: actions.STORE_EDITABLE_TASK,
         payload: {
            task: this.props.task,
            prevRoute: "/all-tasks",
         },
      });
   }
   render() {
      return (
         <div className="row col">
            <ul className="list-group col-11 list-line">
               <li className="list-group-item all-list-text rounded-0">
                  {this.props.task.text}
               </li>
            </ul>
            <Link
               to="/edit-task"
               className="float-right ml-2 mt-3 d-inline"
               onClick={() => {
                  this.storeEditableTask();
               }}
            >
               <EditIcon className="editTaskIcon" />
            </Link>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return { tasks: state.tasks };
}

export default connect(mapStateToProps)(TaskCard);
