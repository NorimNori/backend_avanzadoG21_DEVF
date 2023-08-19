const express = require('express')
const { getTasks, createTasks, updateTasks, deleteTasks } = require('../controllers/tasks_controllers')
const router = express.Router()

router.route('/').get(getTasks).post(createTasks)
// router.get('/', getTasks)
// router.post('/', createTasks)
router.route('/:id').put(updateTasks).delete(deleteTasks)
// router.put('/:id', updateTasks)
// router.delete('/:id', deleteTasks)

module.exports = router