const express =  require('express');
const user_router = new express.Router();
const authMiddleware = require('../middlewares/auth');
const userMiddleware = require('../middlewares/isUser');

const bodyParser = require('body-parser');
// user_router.use(bodyParser.json())
// user_router.use(bodyParser.urlencoded({extended:true}))


const multer = require('multer');
const path =  require("path");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
cb(null,path.join(__dirname,'../public/userImages/'))
    },
    filename:function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    cb(null,name)
    }
})

const upload = multer({storage:storage})

const userController = require('../controllers/user');

// user_router.get('/register',userController.loadRegister);
user_router.post('/register', upload.single('image'),userController.insertUser);
user_router.post('/login', userController.logIn );
user_router.put('/sign-out',authMiddleware, userController.signOut );
user_router.get('/my-profile',authMiddleware,userController.get_data );
user_router.get('/user/:id', authMiddleware, userController.get_user_data)
user_router.patch('/update-user/:id', authMiddleware, userMiddleware, upload.single('image'), userController.editUser);
user_router.get('/user', authMiddleware, userController.get_all_users);
user_router.get('/get-public-users', authMiddleware, userController.get_public_data);







module.exports = user_router;

