const handle_create_task = async (req, res, next) => {
    res.status(201).json({
        message: "Task created!"
    })
};


const handle_get_all_task_list = async (req, res, next) => {
    res.status(200).json({
        message: "List of tasks"
    })
}

const handle_get_task_list_by_userId = async (req, res, next) => {
    const userId = req.params.userId
    res.status(200).json({
        message: `List of tasks By ${userId}`
    })
}
module.exports = { handle_create_task, handle_get_all_task_list, handle_get_task_list_by_userId };