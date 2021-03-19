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

const Todo = model('Todo', TodoSchema);

module.exports = Todo;
