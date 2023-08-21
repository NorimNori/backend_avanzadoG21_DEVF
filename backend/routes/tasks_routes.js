const express = require('express')
const { getTasks, createTasks, updateTasks, deleteTasks } = require('../controllers/tasks_controllers')
const router = express.Router()
const { protect } = require('../middleware/auth_middleware')

router.route('/').get(protect, getTasks).post(protect, createTasks)
// router.get('/', protect, getTasks)
// router.post('/', protect, createTasks)
router.route('/:id').put(protect, updateTasks).delete(protect, deleteTasks)
// router.put('/:id', protect, updateTasks)
// router.delete('/:id', protect, deleteTasks)

module.exports = router