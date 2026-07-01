import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

contactSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    if (ret.createdAt) {
      ret.createdAt = new Date(ret.createdAt).toISOString();
    }
    return ret;
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
