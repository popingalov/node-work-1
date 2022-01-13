const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case 'get':
      const product = await getContactById(id);
      console.table(product);
      break;
    case 'add':
      const newProduct = await addContact(name, email, phone);
      console.table(newProduct);
      break;

    case 'remove':
      const removeProduct = await removeContact(id);
      console.table(removeProduct);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
      break;
  }
};

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
