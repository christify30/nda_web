const express= require('express');
const router=express.Router();
const aprovedUsers=require('../../models/ApprovedUsers');
const users=require('../../models/User');
const passport=require('passport');
const allocateDuty=require('../../models/DutyPost');
const isEmpty= require('../../validation/is-empty')
const profileSchema=require('../../models/Profile');

router.post('/newuser',passport.authenticate('jwt', { session: false }), (req,res,next)=>{
    console.log(req.body)
    let errors='';
     if(isEmpty(req.body.servicenumber)){
         errors="please enter a valid service number";
        return res.status(404).json({msg:errors})
     }
     aprovedUsers.findOne({servicenumber:req.body.servicenumber})
     .then(response=>{
         
         if(response){
            console.log(response)
            return res.status(400).json({msg:"user already exist"})
         }else{
            const servicenumber=new aprovedUsers({
                servicenumber:req.body.servicenumber
               })
               servicenumber.save()
               .then(aprovedUsers=>{
                   res.json({msg:"success", user:servicenumber});
               })
               .catch(err=>{
                   res.status(400).json(err);
               })
         }
     }).catch(err=>{
         res.json(err)
     })

})


  //get all users
  router.get('/users/all', passport.authenticate('jwt', { session: false }), (req,res,next)=>{
    users.find()
    .then(user=>{
       res.json(user)
    })
    .catch(err=>{
        res.json({err:err})
    })
});

router.post('/allocateduty',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
   let dutyToAllocate = new allocateDuty({
        dutytitle:req.body.dutytitle,
        dutybase:req.body.dutybase,
    })
    dutyToAllocate.save()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(400).json({err:err})
    })
})
//Add a personel to the duty table

router.post('/allocateduty/addpersonel',passport.authenticate('jwt', { session: false }),(req,res,next)=>{
    
    allocateDuty.findOne({_id:req.body.id})
    .then(duty=>{
        profileSchema.findOne({user:req.body.user})
        .then(user=>{
            const personel={
                name:req.body.name,
                user:req.body.user,
                armofservice:req.body.armofservice,
                rank:user.rank,
                dutylocation:req.body.dutylocation,
                servicenumber:req.body.servicenumber,
                from:req.body.from,
                to:req.body.to
              }
              //console.log(personel);
              duty.dutypersonnel.unshift(personel);
              duty.save()
              .then(data=>{
                  console.log(data);
                  res.json(data)
              })
              .catch(err=>{
                  console.log(err)
                  res.json({err:err});
              })
        }).catch(err=>{

        })
       
    }).catch(err=>{
        console.log(err)
        return res.json(err)
    })
   
})
module.exports=router;
