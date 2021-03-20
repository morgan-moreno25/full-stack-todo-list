const Project = require('../models/Project');
const User = require('../models/User');

const getAllProjects = async (req, res) => {
	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const projects = await Project.findByUser(validUser._id);

			return res.status(200).json({ projects });
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `User with id ${req.user.id} was not found`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
const addProject = async (req, res) => {
	const { title, description } = req.body;

	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const newProject = new Project({
				title,
				description: description ? description : '',
				user: validUser._id,
			});

			const project = await newProject.save();

			return res.status(201).json({ project });
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `User with id ${req.user.id} was not found`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
const updateProject = async (req, res) => {
	const { title, description } = req.body;

	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const validProject = await Project.findById(req.params.id);

			if (validProject) {
				if (validProject.user.toString() === validUser._id.toString()) {
					const updatedProject = await Project.findByIdAndUpdate(
						req.params.id,
						{
							$set: {
								title,
								description,
							},
						},
						{ new: true }
					);

					return res.status(200).json({ updatedProject });
				} else {
					return res.status(401).json({
						error: 'not_authorized',
						message: 'You are not authorized to update this project',
					});
				}
			} else {
				return res.status(400).json({
					error: 'bad_request',
					message: `Project with id ${req.params.id} does not exist`,
				});
			}
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `User with id ${req.user.id} was not found`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
const deleteProject = async (req, res) => {
	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const validProject = await Project.findById(req.params.id);

			if (validProject) {
				if (validUser._id.toString() === validProject.user.toString()) {
					await Project.findByIdAndDelete(req.params.id);

					return res.status(200).json({ message: `Successfully deleted project ${req.params.id}` });
				} else {
					return res.status(401).json({
						error: 'not_authorized',
						message: 'You are not authorized to delete this project',
					});
				}
			} else {
				return res.status(400).json({
					error: 'bad_request',
					message: `Project with id ${req.params.id} does not exist`,
				});
			}
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `User with id ${req.user.id} was not found`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};

module.exports = {
	addProject,
	deleteProject,
	getAllProjects,
	updateProject,
};
