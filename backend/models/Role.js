const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    permissions: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);