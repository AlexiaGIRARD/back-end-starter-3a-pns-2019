const { Router } = require('express');
const { Student } = require('../../models');
const { Ticket } = require('../../models');

const attachTicket = function (student) {
  const tickets = Ticket.get().filter(t => parseInt(t.studentId, 10) === student.id);
  const curStudent = Object.assign({}, student);
  curStudent.tickets = tickets;
  return curStudent;
};

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.get('/:studentId', (req, res) => res.status(200).json(attachTicket(Student.getById(req.params.studentId))));
router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));
router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));
router.post('/', (req, res) => {
  try {
    const ticket = Student.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
