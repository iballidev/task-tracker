const mongoose = require("mongoose");
const Joi = require("joi");
const TASK_STAGE_LIST = require("../../config/task-stage-list");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    stage: { type: Number, default: TASK_STAGE_LIST.Open },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const validateTask = task => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.string().required()
    });

    return schema.validate(task);
};
module.exports.Task = mongoose.model("Task", taskSchema);
module.exports.validateTask = validateTask;