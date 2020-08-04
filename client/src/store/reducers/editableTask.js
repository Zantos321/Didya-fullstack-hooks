import actions from "../actions";

export default function editableTask(editableTask = {}, action) {
   let newEditableTask = { ...editableTask };
   switch (action.type) {
      case actions.STORE_EDITABLE_TASK:
         newEditableTask = action.payload;
         newEditableTask.prevRoute = action.payload.prevRoute;
         return newEditableTask;
      default:
         return editableTask;
   }
}
