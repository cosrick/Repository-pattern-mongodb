import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
}, { collection: 'Admin' } );

export const AdminModel = mongoose.model('Admin', AdminSchema);