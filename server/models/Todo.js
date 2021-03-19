const { Schema, model } = require('mongoose');
const moment = require('moment');

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	priority: {
		type: String,
		required: true,
		enum: ['low', 'medium', 'high'],
	},
	dueDate: {
		type: String,
		required: true,
	},
	project: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

TodoSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		const dueDate = moment(returnedObject.dueDate, 'YYYY-MM-DD');

		returnedObject.timeUntilDue = moment().to(dueDate);
		returnedObject.id = returnedObject._id.toString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

TodoSchema.statics.findByUser = function (user_id) {
	return this.find({ user: user_id });
};
TodoSchema.statics.findByProject = function (project_id) {
	return this.find({ project: project_id });
};

const Todo = model('Todo', TodoSchema);

module.exports = Todo;
