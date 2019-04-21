const express=require('express');
const router=express.Router();
const multer=require('multer');
//const var upload = multer().single('avatar')
/////////////////////handle storage errors//////////
const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
/////////////////////Destination to store the file//////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
  })
  const upload = multer({ storage: storage }).single('avatar')/////
  
  router.get('/',(req,res,next)=>{
      res.json({msg:"this test router is working"})
  })

  router.post('/',  (req, res, next)=> {
   
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
        } else if (err) {
          // An unknown error occurred when uploading.
        }
        let tempPath = req.file.path;
        res.json({msg:"this test router is working"})
        console.log(tempPath);
        // Everything went fine.
      })

    //console.log(process.env);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });
   
  


module.exports=router;