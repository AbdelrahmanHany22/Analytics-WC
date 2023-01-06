const mongoose = require('mongoose');


const ticketsSchema = mongoose.Schema({
    messagesType:{
        type:String,
        required: [true, 'A ticket must have a type'],
    },
    Count:{
        type:Number,
        required: [true],
        default:0
    }

},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
});

const AnalysisTickets = mongoose.model('Analysis Tickets', ticketsSchema);
module.exports = AnalysisTickets;