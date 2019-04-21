const express = require('express');
const router = express.Router();
const validateDutyInput=require('../../validation/duty');
const DutySchema=require('../../models/DutyPost');
const passport=require('passport');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

router.post('/', passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    const {errors, isValid} = validateDutyInput(req.body);
    if(!isValid){
      res.status(400).json(errors);
    }

 const duty=new DutySchema({
     dutytitle:req.body.dutytitle,
     dutybase:req.body.dutybase,
     from:req.body.from,
     to:req.body.to
  })
  duty.save()
  .then(newduty=>{
      //console.log("what")
      res.json(newduty)
      
  })
  .catch(err=>{
      res.status(400).json(err)
  })

})
//get all duties 
//get api/dutypost
router.get('/', passport.authenticate('jwt',{session:false}) ,(req,res,next)=>{
DutySchema.find()
.sort({from: -1})
.then(duties=>{
    res.json(duties)
  })
  .catch(err=>{
      res.status(404).json(err)
  })
 })
//delete a post 
// api/dutypost/delete/:id
 router.delete('/delete/:id', passport.authenticate('jwt',{session:false}),(req,res,next)=>{
   DutySchema.findOne({_id:req.params.id})
   .then(duty=>{
      duty.remove()
      .then(duty=>{
        res.json({msg:`duty (${duty.dutytitle}) successfully deleted`})
      }).catch(err=>{
        console.log(err)
      })
   }).catch(err=>{
     res.status(400).json(err)
   })
 })

module.exports = router;
