const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({

    section_id: { type: String,
        unique: true },
   
        section_name: { type: String,
                 trim: true }
});

const Section = mongoose.model('Section', sectionSchema);

module.exports =Section;
