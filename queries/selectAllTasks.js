const selectAllTasks = `
         SELECT 
             *
         FROM
             tasks
         WHERE
             tasks.user_id = ?
     `;

module.exports = selectAllTasks;
