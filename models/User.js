const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const moment = require('moment');

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', currentTime: () => moment() } }
);

UserSchema.plugin(uniqueValidator);
UserSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		returnedObject.timestamps = {
			createdAt: returnedObject.createdAt,
			updatedAt: returnedObject.updatedAt,
		};

		delete returnedObject.passwordHash;
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.createdAt;
		delete returnedObject.updatedAt;
	},
});
UserSchema.statics.findByUsername = function (username) {
	return this.findOne({ username });
};

const User = model('User', UserSchema);

module.exports = User;
