import React from "react";
import BodyTemplate from "../ui/BodyTemplate";
import { Link } from "react-router-dom";
import TaskCard from "../ui/TaskCard";
import { AddTask } from "../../icons/Icons";
import axios from "axios";

export default class AllTasks extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         tasks: [],
      };
   }

   componentDidMount() {
      this.setTasks();
   }

   setTasks() {
      axios
         .get(`/api/v1/tasks?`)
         .then((res) => {
            console.log(res.data);
            // handle success
            const allTasks = res.data;
            console.log(res);
            this.setState({
               tasks: allTasks,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      return (
         <BodyTemplate>
            <div className="row col d-flex justify-content-between">
               <h3 className="pl-2 mt-3 ml-2">ALL TASKS</h3>

               <Link to="/add-task" className="mt-3 d-inline float-right">
                  <AddTask className="addTaskIcon" />
               </Link>
            </div>
            {this.state.tasks.map((task) => {
               console.log(task);
               return <TaskCard task={task} key={task.id} />;
            })}
         </BodyTemplate>
      );
   }
}
