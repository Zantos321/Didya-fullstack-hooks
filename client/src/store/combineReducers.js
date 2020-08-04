import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import tasks from "./reducers/tasks";
import editableTask from "./reducers/editableTask";
import creatableTask from "./reducers/creatableTask";

export default combineReducers({
   currentUser,
   tasks,
   editableTask,
   creatableTask,
});
