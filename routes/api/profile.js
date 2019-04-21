const express = require('express');
const router = express.Router();
const path =require('path');
const multer=require('multer');
const profileSchema=require('../../models/Profile');
const passport=require('passport');
const validateProfileInput=require('../../validation/profile');
const users=require('../../models/User');
const duties=require('../../models/DutyPost');


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
      cb(null, './public/uploads');
    },
    filename: (req, file, cb)=>{
      cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
  })
  const upload = multer({ storage: storage }).single('avatar')

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


// @route   GET api/profile/avatar/:image
// @desc    Tests profile route
// @access  Private

router.get('/avatar/:image',(req,res)=>{
    //console.log("this route was hit");
      res.sendFile(path.resolve(__dirname,'../../public', 'uploads', req.params.image));
  })

// @route Post api/profile/avatar/:image
// @desc upload profile
// @access private

router.post('/', passport.authenticate('jwt',{session:false}),(req, res, next)=> {
 
    upload(req, res, function (err) {
      console.log(req.file);
      const {errors, isValid} = validateProfileInput(req.body);
      if(!isValid){
        res.status(400).json(errors);
      }
    else{
      if(!req.file){
        console.log(req.file);
        console.log(req.body);
        errors.file="you must upload a file"
       res.status(400).json(errors);
      }else{
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          errors.file="An error occured";
          res.status(400).json(errors);
         // res.status(400).json(errors);
        } else if (err) {
          errors.file="An error occured";
          res.status(400).json(errors);
        }
        let profileFields = {
          user:req.user.id,
          email:req.body.email,
          avatar:req.file.filename,
          armofservice:req.body.armofservice,
          mobilenumber:req.body.mobilenumber,
          rank:req.body.rank
        };
       // console.log(req.body);
       
        profileSchema.findOne({user:req.user.id})
        .then(profile=>{
          if(profile){
            profileSchema.findOneAndUpdate(
              {user:req.user.id},
              {$set:profileFields},
              {new:true})
              .then(profile=>{
                res.json({msg:"profile updated",profile:profile})
              })
          }else{
           // profile=new profileSchema({profileFields});
           // console.log(profile);
            new profileSchema(profileFields).save()
            .then(profile=>{
              res.status(200).json({msg:"Profile succesfully created",profile:profile})
              console.log("succes");
            })
            .catch(err=>{
              console.log(err)
              res.status(400).json(err);
            })
          }//ends else if not profile
        } ).catch(err=>{
          console.log(err);
          res.status(400).json(err);

        })
        //res.json(req.file);
        // Everything went fine.
         }//ends else if image data exist
       }//ends else if valid
    })
   
    //console.log(process.env);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    
  });

router.get('/', passport.authenticate('jwt',{session:false}) ,(req,res)=>{
    const errors={};
    //console.log(req);
  profileSchema.findOne({user:req.user.id})
  //.populate('user',['name','avatar'])
  .then(profile=>{
      if(!profile){
          errors.noprofile="There is no profile for this user";
          return res.status(404).json(errors);
      }
      res.json(profile)
  })
  .catch(err=>{
      res.status(404).json(err);
  });
});

//get all duties
router.get('/duties/all',(req,res,next)=>{
  duties.find()
    .then(user=>{
       res.json(user)
    })
    .catch(err=>{
        res.json({err:err})
    })
})

module.exports = router;
