const mongoose=require('mongoose');
const Schema= mongoose.Schema;

adminShema= new Schema({
    admin:{
        type:String,
        require:true
    }
})

module.exports= adm=mongoose.model('admins',adminShema);