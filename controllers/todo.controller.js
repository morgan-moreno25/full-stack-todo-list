const { Request, Response } = require('express');
const Todo = require('../models/Todo');
const User = require('../models/User');
const Project = require('../models/Project');

/**
 * @description Get all todos
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const getAllTodos = async (req, res) => {
	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const todos = await Todo.findByUser(validUser._id);

			return res.status(200).json({ todos });
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `Could not find user with id ${req.user.id}`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
/**
 * @description Create a todo
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const addTodo = async (req, res) => {
	const { text, priority, dueDate, project } = req.body;

	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const validProject = await Project.findOne({ title: project });

			if (validProject) {
				const newTodo = new Todo({
					text,
					priority,
					dueDate,
					project: validProject._id,
					user: validUser._id,
				});

				const todo = await newTodo.save();

				return res.status(201).json({ todo });
			} else {
				return res.status(400).json({
					error: 'validation_error',
					message: `Project with title ${project} does not exist`,
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
/**
 * @description Update a single todo
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const updateTodo = async (req, res) => {
	const { text, priority, dueDate, project } = req.body;

	try {
		const validTodo = await Todo.findById(req.params.id);

		if (validTodo) {
			const validUser = await User.findById(req.user.id);

			if (validUser) {
				if (validUser._id.toString() === validTodo.user.toString()) {
					const validProject = await Project.findOneByTitle(project);

					if (validProject) {
						const updatedTodo = await Todo.findByIdAndUpdate(
							validTodo._id,
							{
								$set: {
									text,
									priority,
									dueDate,
									project: validProject._id,
								},
							},
							{ new: true }
						);

						return res.status(200).json({ updatedTodo });
					} else {
						return res.status(400).json({
							error: 'bad_request',
							message: `Project with title ${project} does not exist`,
						});
					}
				} else {
					return res.status(401).json({
						error: 'not_authorized',
						message: 'You are not authorized to update this todo',
					});
				}
			} else {
				return res.status(400).json({
					error: 'bad_request',
					message: `User with id ${req.user.id} was not found`,
				});
			}
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `Todo with id ${req.params.id} does not exist`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			error: 'server_error',
			message: error.message,
		});
	}
};
/**
 * @description Delete a single todo
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const deleteTodo = async (req, res) => {
	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const validTodo = await Todo.findById(req.params.id);

			if (validTodo) {
				if (validTodo.user.toString() === validUser._id.toString()) {
					await Todo.findByIdAndDelete(req.params.id);

					return res
						.status(200)
						.json({ message: `Successfully deleted todo with id ${req.params.id}` });
				} else {
					return res.status(401).json({
						error: 'not_authorized',
						message: 'You are not authorized to delete this todo',
					});
				}
			} else {
				return res.status(400).json({
					error: 'bad_request',
					message: `Todo with id ${id} does not exist`,
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
/**
 * @description Toggle the isComplete property on a single todo
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
const toggleCompleted = async (req, res) => {
	try {
		const validUser = await User.findById(req.user.id);

		if (validUser) {
			const validTodo = await Todo.findById(req.params.id);

			if (validTodo) {
				if (validTodo.user.toString() === validUser._id.toString()) {
					const updatedTodo = await Todo.findByIdAndUpdate(
						req.params.id,
						{
							$set: {
								isComplete: !validTodo.isComplete,
							},
						},
						{ new: true }
					);

					return res.status(200).json({
						updatedTodo: updatedTodo,
					});
				} else {
					return res.status(401).json({
						error: 'not_authorized',
						message: 'You are not authorized to update this todo',
					});
				}
			} else {
				return res.status(400).json({
					error: 'bad_request',
					message: `Todo with ${id} does not exist`,
				});
			}
		} else {
			return res.status(400).json({
				error: 'bad_request',
				message: `User with ${id} was not found`,
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
	addTodo,
	deleteTodo,
	getAllTodos,
	toggleCompleted,
	updateTodo,
};
