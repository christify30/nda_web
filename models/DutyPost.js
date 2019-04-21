const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dutyPost=new Schema({
    dutytitle:{
        type:String,
        required:true
    },
    dutybase:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:false
    },
    dutypersonnel:[
       {
           name:{
               type:String,
               require:true
           },
           user:{
               type:Schema.Types.ObjectId,
               required:true
           },
           armofservice:{
            type:String,
            required:true
           },
          rank:{
              type:String,
              required:true
          },
          dutylocation:{
            type:String,
            required:true
        },
          from:{
              type:String,
              required:true
          },
          to:{
              type:String,
              required:false
          },
          servicenumber:{
              type:String,
              required:true
          }
       }
    ]
    
})

module.exports=dutypost=mongoose.model('dutyPosts',dutyPost);