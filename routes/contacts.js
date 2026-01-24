const router = require('express').Router();
const contactsController = require('../controllers/contactsController');

// GET
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);

// POST
router.post('/', contactsController.createContact);

// PUT
router.put('/:id', contactsController.updateContact);

// DELETE
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
