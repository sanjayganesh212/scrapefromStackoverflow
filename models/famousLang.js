const mongoose = require('mongoose');
const collections = require("../helper/collection")
const sswhvx = require("../config/production")

const dbPrefix = sswhvx.db_prefix;

const programmingLanguageSchema = new mongoose.Schema({
    name: {
        type: String, required: true,
        unique: true
    },
    creator: {
        type: String,
        default: 'Unknown'
    },
    releaseYear: {
        type: Number,
        default: 0
    },
    popularityScore: {
        type: Number,
        default: 0
    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    totalAnswers: {
        type: Number,
        default: 0
    },
    totalUsers: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        default: []
    },
});

const ProgrammingLanguage = mongoose.model(collections.db_prefix.famousProgramming,
    programmingLanguageSchema,
    dbPrefix + collections.db_suffix.famousProgramming);


module.exports = ProgrammingLanguage;
