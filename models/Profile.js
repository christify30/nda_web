const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema= new Schema({
     user: {
          type:Schema.Types.ObjectId,
          ref : 'users'
      },
    avatar: {
        type: String,
        required:true
      },
      admin:{
          type:Boolean,
          default:false
      },
      mobilenumber:{
          type:String,
          required:true
      },
      rank:{
       type:String,
       required:true
      },
       email: {
        type: String,
        required: true
      },

      message:{
        messagebody:[

        ],
        messagecounter:[

        ]
      },
   notifications:{
    notificationbody:[

        ],
    notificationcount:[
          
        ]
      }
      
})
module.exports = Profile = mongoose.model('profiles', profileSchema);