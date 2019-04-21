const mongoose =require('mongoose');
const Schema= mongoose.Schema;

const ApprovedUsers= new Schema({
    servicenumber:{
        type:String,
        required:true
    }
})
module.exports=ApprovedUser=mongoose.model('approvedusers',ApprovedUsers);