const deleteTaskById = `
    DELETE FROM
        tasks 
    WHERE
        id = ?;
`;
module.exports = deleteTaskById;
