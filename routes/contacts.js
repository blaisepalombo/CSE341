const router = require('express').Router();
const contactsController = require('../controllers/contactsController');

// GET all
// #swagger.tags = ['Contacts']
// #swagger.description = 'Get all contacts'
router.get('/', contactsController.getAllContacts);

// GET by id
// #swagger.tags = ['Contacts']
// #swagger.description = 'Get a single contact by id'
/* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'MongoDB ObjectId'
} */
router.get('/:id', contactsController.getSingleContact);

// POST
// #swagger.tags = ['Contacts']
// #swagger.description = 'Create a new contact'
/* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Contact" }
        }
      }
} */
router.post('/', contactsController.createContact);

// PUT
// #swagger.tags = ['Contacts']
// #swagger.description = 'Update an existing contact by id'
/* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'MongoDB ObjectId'
} */
/* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Contact" }
        }
      }
} */
router.put('/:id', contactsController.updateContact);

// DELETE
// #swagger.tags = ['Contacts']
// #swagger.description = 'Delete a contact by id'
/* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'string',
      description: 'MongoDB ObjectId'
} */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
