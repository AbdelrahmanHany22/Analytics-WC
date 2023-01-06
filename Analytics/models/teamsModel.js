const mongoose = require('mongoose');


const teamsAnalysis = mongoose.Schema({
    Team:{
        type:String,
        required: [true],
        unique: [true]
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

const teams = mongoose.model('teams', teamsAnalysis);

module.exports=teams;