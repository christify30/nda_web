const mongoose=requre('mongoose');
const Schema=mongoose.Schema;

const testSchema=new Schema({
    avatar:{
        type:String,
        require:true
    }
})

module.exports= testSchema=mongoose.model('tests',testSchema);
