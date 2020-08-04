const updateTask = `
    UPDATE 
        tasks 
    SET 
        ?
    WHERE
        id = ?;
`;
module.exports = updateTask;
