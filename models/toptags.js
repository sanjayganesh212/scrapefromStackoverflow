const mongoose = require('mongoose');
const collections = require("../helper/collection")
const sswhvx = require("../config/production")

const dbPrefix = sswhvx.db_prefix;

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  totalQuestions: {
    type: Number,
    default: 0
  },

  totalViews: {
    type: Number,
    default: 0
  },

  totalVotes: {
    type: Number,
    default: 0
  },
}, { timestamps: true, versionKey: false });


const tagsSch = mongoose.model(
  collections.db_prefix.toptags,
  tagSchema,
  dbPrefix + collections.db_suffix.toptags);

module.exports = tagsSch;
