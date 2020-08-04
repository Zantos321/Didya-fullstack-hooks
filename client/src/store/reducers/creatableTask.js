import actions from "../actions";

export default function creatableTask(creatableTask = {}, action) {
   switch (action.type) {
      case actions.UPDATE_CREATABLE_TASK:
         return action.payload; // put it in the redux store
      default:
         return creatableTask;
   }
}
