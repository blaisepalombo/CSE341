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

// POST /contacts
const createContact = async (req, res) => {
  try {
    const db = getDb();

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // All fields required
    const missing = Object.entries(contact)
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);

    if (missing.length) {
      return res
        .status(400)
        .json({ error: `All fields are required. Missing: ${missing.join(', ')}` });
    }

    const result = await db.collection('contacts').insertOne(contact);

    // Requirement: return new contact id + 201
    return res.status(201).json({ id: result.insertedId });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// PUT /contacts/:id
const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // All fields required
    const missing = Object.entries(contact)
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);

    if (missing.length) {
      return res
        .status(400)
        .json({ error: `All fields are required. Missing: ${missing.join(', ')}` });
    }

    const result = await db
      .collection('contacts')
      .replaceOne({ _id: new ObjectId(id) }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Requirement: 204 No Content
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// DELETE /contacts/:id
const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const result = await db
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Instructor demo used 204; rubric text sometimes says 200.
    // If your rubric strictly requires 200, change this to: res.status(200).json({ message: 'Deleted' })
    return res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
