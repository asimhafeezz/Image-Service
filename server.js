const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { v4: uuidv4 } = require('uuid');

const fs = require('fs')
const multer =require('multer')
const path=require('path');
const directory = './public/productItemImage';
var fname = null




const storage=multer.diskStorage({
        destination:function(req,file,cb){
                //define the directory
                cb(null,directory);
        },
        filename:function(req,file,cb){
                fname = uuidv4() +file.originalname
                cb(null,fname);
        }
});
const upload=multer({storage:storage});

const app = express()


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/productItemImage')));

//body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//cors
app.use(cors())

const { apiCall } = require('./apiCall')

//import db connection
// require('./connection')

//import schema and model
// const {
//     Franchise
// } = require('./schema')


//upload images
app.post('/productitemimage', upload.single('productItemImage'), (req, res) => {
    let filename = req.file.originalname
    let { token , productItemID} = req.body
    console.log(req.body)

    var postData = {
        service_NAME: 'PRODUCT',
        request_TYPE: "PUT",
        request_URI: "productitem/" + productItemID,
        request_BODY: `{productitem_IMAGE: ${fname} }`
    }
    
    apiCall(postData , token).then(resData => console.log(resData))
    res.status(200).json({"filename": filename})
})


app.listen(3335, () => console.log('server started...'))