// The tasks resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllTasks = require("../../queries/selectAllTasks");
const validateJwt = require("../../utils/validateJwt");
const insertTask = require("../../queries/insertTask");
const updateTask = require("../../queries/updateTask");
const deleteTaskById = require("../../queries/deleteTaskById");

// @route       GET api/v1/tasks
// @desc        Get all taks for a user
// @access      Private
router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const userId = req.user.id;
   db.query(selectAllTasks, [userId])
      .then((tasks) => {
         const camelCaseTasks = tasks.map((task) => {
            return {
               id: task.id,
               text: task.text,
               userId: task.user_id,
               isCompleted: task.is_completed,
               lastDoneAt: task.last_done_at,
               timesCompleted: task.times_completed,
            };
         });
         res.json(camelCaseTasks);
         console.log(camelCaseTasks);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

// @route       POST api/v1/tasks
// @desc        POST a task to the tasks resource
// @access      Private
router.post("/", validateJwt, (req, res) => {
   const user = req.user;
   const { id, text, isCompleted, lastDoneAt, timesCompleted } = req.body;
   const task = {
      id,
      text,
      user_id: user.id,
      is_completed: isCompleted,
      last_done_at: lastDoneAt,
      times_completed: timesCompleted,
   };
   console.log(task);
   db.query(insertTask, task)
      .then((dbRes) => {
         // success
         console.log("Created task in the db", dbRes);
         return res.status(200).json({ success: "task created" });
      })
      .catch((err) => {
         // error
         console.log(err);
         // return with an error response
         dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(400).json({ dbError });
      });
});

// @route       PUT api/v1/tasks/:id
// @desc        UPDATE a task to the tasks resource
// @access      Private
router.put("/:id", validateJwt, (req, res) => {
   const id = req.params.id;
   const user = req.user;
   const { text, isCompleted, lastDoneAt, timesCompleted } = req.body;
   const task = {
      id,
      text,
      user_id: user.id,
      is_completed: isCompleted,
      last_done_at: lastDoneAt,
      times_completed: timesCompleted,
   };
   console.log(task);
   db.query(updateTask, [task, id])
      .then((dbRes) => {
         // success
         console.log("Updated task in the db", dbRes);
         return res.status(200).json({ success: "task updated" });
      })
      .catch((err) => {
         // error
         console.log(err);
         // return with an error response
         dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(400).json({ dbError });
      });
});

// @route       DELETE api/v1/tasks/:id
// @desc        Delete a task to the tasks resource by id
// @access      Private
router.delete("/:id", validateJwt, (req, res) => {
   const id = req.params.id;
   db.query(deleteTaskById, id)
      .then(() => {
         // success
         return res.status(200).json({ success: "task deleted" });
      })
      .catch((err) => {
         // error
         console.log(err);
         // return with an error response
         dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(500).json({ dbError });
      });
});

module.exports = router;
