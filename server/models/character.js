const mongoose = require('mongoose');

var Character = mongoose.model('Character', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    system: {
        type: String,
        default: 'DnD'
    },
    level: {
        type: Number,
        default: 1
    }
});

module.exports = { Character };
