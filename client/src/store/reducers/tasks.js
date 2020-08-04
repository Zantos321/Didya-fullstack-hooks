import actions from "../actions";

export default function tasks(taskQueue = {}, action) {
   console.log(action);
   // action.payload, action.type
   let newTaskQueue = { ...taskQueue };
   switch (action.type) {
      case actions.STORE_QUEUED_TASKS:
         newTaskQueue = action.payload;
         return newTaskQueue;
      case actions.RESET_TASK_QUEUE:
         // newTaskQueue = [];
         newTaskQueue = action.payload;
         console.log(action.payload);
         return newTaskQueue;
      default:
         return taskQueue;
   }
}
