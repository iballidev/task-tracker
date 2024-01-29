const { validateTask, Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const handle_create_task = async (req, res, next) => {
    const control_fields = ({ title, description, dueDate, userId } = req.body);
    const { error } = validateTask({ title, description, userId });

    if (error) {
        return res.status(400).json({
            message: error?.details[0]?.message,
            formData: control_fields
        });
    }


    const foundUser = await User.findOne({ _id: userId }).exec();

    if (!foundUser) {
        return res.status(401).json({
            message: "Auth failed",
            formData: control_fields
        });
    }

    const result = await Task.create({
        title: title,
        description: description,
        dueDate: dueDate,
        userId: userId
    });

    if (result) {
        res.status(201).json({
            message: "Task created!",
            task: result
        })
    }

};


const handle_get_all_task_list = async (req, res, next) => {

    const result = await Task.find().select("_id title description dueDate userId stage")
        .populate({
            path: 'userId',
            select: '_id email',
        }).exec();

    res.status(200).json({
        message: `List of all tasks`,
        tasks: result
    });
}

const handle_get_task_list_by_userId = async (req, res, next) => {
    const user = req.params.userId;

    const foundUser = await User.findOne({ _id: user }).exec();
    console.log("foundUser: ", foundUser);

    if (!foundUser) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }


    const result = await Task.find({ userId: user }).select("_id title description dueDate userId stage")
        .populate({
            path: 'userId',
            select: '_id email',
        }).exec();

    res.status(200).json({
        message: `List of tasks`,
        tasks: result
    });


}

const handle_get_task_details = async (req, res, next) => {
    const taskId = req.params.taskId;
    const response = await Task.findOne({ _id: taskId });
    res.status(200).json({
        message: "Task details!",
        response: response
    })
}


const handle_update_task_stage = async (req, res, next) => {
    const taskId = req.params.taskId
    const updateFields = req.body
    await Task.findOneAndUpdate({ _id: taskId }, updateFields);
    res.status(204).json({
        message: "Task updated!"
    })
}


const handle_delete_task_stage = async (req, res, next) => {
    const taskId = req.params.taskId
    await Task.findOneAndDelete({ _id: taskId });
    res.status(200).json({
        message: "Task deleted!"
    })
}

module.exports = { handle_create_task, handle_get_all_task_list, handle_get_task_list_by_userId, handle_get_task_details, handle_update_task_stage, handle_delete_task_stage };