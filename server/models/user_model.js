const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: 'String',
		required: true,
	},
	age: {
		type: 'String',
		required: true,
	},
	phone: {
		type: 'String',
		required: true,
	},
	pwd: {
		type: 'String',
		required: true,
	},
	fees: {
		type: 'String',
		required: true,
	},
	slot: {
		type: 'String',
		required: true,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
