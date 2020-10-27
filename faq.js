const mongoose = require('mongoose');
const { stringify } = require('querystring');

const postfaqSchema = mongoose.Schema({
    technology : {type: String},
    version : {type : String},
    question :{type: String},
    answer :{type: String},
    dateCreated:{type : Date, default: Date.now},
    createdBy : {type : String},
    dateModified:{type : Date, default: Date.now},
    modifiedBy : {type : String}
})
//postfaqSchema.index({'question': 'text' });
module.exports= mongoose.model('Faq', postfaqSchema);
