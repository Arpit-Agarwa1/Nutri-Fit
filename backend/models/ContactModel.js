import { readData, writeData } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

/** Contact model - handles contact form submissions */
class ContactModel {
  /** Get all contact submissions */
  static getAll() {
    return readData('contacts.json');
  }

  /**
   * Create a new contact submission
   * @param {Object} contactData - name, email, phone, message
   * @returns {Object} Created contact record
   */
  static create(contactData) {
    const contacts = readData('contacts.json');

    const contact = {
      id: uuidv4(),
      ...contactData,
      createdAt: new Date().toISOString(),
    };

    contacts.push(contact);
    writeData('contacts.json', contacts);
    return contact;
  }
}

export default ContactModel;
