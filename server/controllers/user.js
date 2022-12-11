const User = require('../models/user_model');

exports.getAllUsers = (req, res) => {
	User.find()
		.then((todo) => res.json(todo))
		.catch((err) =>
			res.status(404).json({ message: 'user not found', error: err.message })
		);
};

exports.postCreateUser = (req, res) => {
	User.create(req.body)
		.then((data) => res.json({ message: 'User added successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'Failed to add user', error: err.message })
		);
};

exports.putUpdateData = (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body)
		.then((data) => res.json({ message: 'updated successfully', data }))
		.catch((err) =>
			res
				.status(400)
				.json({ message: 'Failed to update user', error: err.message })
		);
};
exports.getByPhone = (req, res) => {
	console.log(req.query.phone);

	User.find({
		phone: `${req.query.phone}`,
	})
		.then((user) => res.json(user))
		.catch((err) =>
			res
				.status(404)
				.json({ message: 'Interview not found', error: err.message })
		);
};
