
const { mongoose } = require('@root/app/common/modules');
const { Schema } = require('mongoose');

const name = 'User';
const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: false,
            required: true
        },
        password: {
            type: String,
            required: true
        },       
        createdDt: {
            type: Date,
            default: Date.now
        },
        updatedDt: {
            type: Date,
        }
    }
);
const Model = mongoose.model(name, schema);
const model = new Model();

module.exports = model;
