const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(el => el.id === String(id));
    if (!result) {
      throw new Error(`Contact with id:${id} not found`);
    }
    return result;
  } catch (error) {
    return error.message;
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const removedEl = [];
    const newContacts = contacts.reduce((acc, el) => {
      if (el.id === String(id)) {
        removedEl.push(el);
        return acc;
      }
      acc.push(el);
      return acc;
    }, []);

    if (removedEl.length < 1) {
      throw new Error(`Id:${id} not correct`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

    return removedEl;
  } catch (error) {
    return error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    if (!name || !email || !phone) {
      throw new Error(`Not correct form`);
    }
    const newContat = { name, email, phone, id: v4() };

    contacts.push(newContat);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContat;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
