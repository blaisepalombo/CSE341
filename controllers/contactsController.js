const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connection');

// GET /contacts
const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /contacts/:id
const getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllContacts, getSingleContact };
