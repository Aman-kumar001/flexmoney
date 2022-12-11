// router/todo.js
const express = require('express');
const {
	getAllUsers,
	postCreateUser,
	putUpdateData,
	getByPhone,
} = require('../controllers/user');
const router = express.Router();

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get('/', getAllUsers);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post('/', postCreateUser);

/**
 * @route PUT api/user/:id
 * @description update todo
 * @access public
 */
router.put('/:id', putUpdateData);

router.get('/getUser', getByPhone);

module.exports = router;
