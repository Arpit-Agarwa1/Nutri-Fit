import { v4 as uuidv4 } from 'uuid';
import Contact from '../schemas/Contact.js';

/** Contact model — MongoDB persistence */
class ContactModel {
  /** Get all contact submissions */
  static async getAll() {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return contacts.map(({ _id, ...rest }) => ({
      ...rest,
      createdAt: rest.createdAt ? new Date(rest.createdAt).toISOString() : undefined,
    }));
  }

  /**
   * Create a new contact submission
   * @param {Object} contactData - name, email, phone, message
   * @returns {Promise<Object>} Created contact record
   */
  static async create(contactData) {
    const contact = await Contact.create({
      id: uuidv4(),
      ...contactData,
    });

    return contact.toJSON();
  }
}

export default ContactModel;
