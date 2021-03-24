const { Schema, model, models } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

ProjectSchema.plugin(uniqueValidator);
ProjectSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

ProjectSchema.statics.findByUser = function (user_id) {
	return this.find({ user: user_id });
};
ProjectSchema.statics.findOneByTitle = function (title) {
	return this.findOne({ title });
};

const Project = model('Project', ProjectSchema);

module.exports = Project;
