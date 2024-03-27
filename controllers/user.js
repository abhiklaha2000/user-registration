const User = require("../models/user");
const RevokedToken = require("../models/revoked");
const jwt = require("jsonwebtoken");

const insertUser = async (req, res) => {
  try {
  
    const image = req.file? "http://localhost:4000/public/userImages/" + req.file.filename : req.body.image;
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      image: image,
      password: req.body.password,
      is_admin: req.body.is_admin,
      type: req.body.type,
      bio: req.body.bio,
    });

    const userData = await user.save();
    res.send(userData);
  } catch (err) {
    console.log(err.message);
  }
};

// User can LogIn with the mobile and password
const logIn = async (req, res) => {
  const { mobile, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ mobile, password });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create and return JWT token
  const token = jwt.sign(
    { _id: user._id, email: user.email, is_admin: user.is_admin },
    "secret_key",
    { expiresIn: "1d" }
  );
  res.json({
    message: "Successfully logged in!",
    token,
  });
};

// User Signout
const signOut = function (req, res) {
  const authHeader = req.headers["authorization"].split(" ")[1];
  const newRevokedToken = RevokedToken({ token: authHeader });
  newRevokedToken.save();

  res.send({message: "Successfully signed out!"})
};

// To see the details of the user
const get_data = async (req, res) => {
  try {
    const _id = req.user._id;
    const user_detail = await User.findById(_id);
    res.send(user_detail);
  } catch (err) {
    console.log(err);
  }
};

// To get the single user who are pubic or private
const get_user_data = async (req, res) => {
  try{
    const _id = req.params.id;
    const isAdmin = req.user.is_admin;

    const user = await User.findById(_id);
    if(isAdmin){
      res.send(user);
    }else{
      if(user.type === 'public'){
        res.send(user);
      }

      res.send({message: "You can only see Public Profiles!"});
    }

  }catch(err){
    res.send(err.message)
  }
}

// To get all Users 
const get_all_users = async (req, res) => {
  const isAdmin = req.user.is_admin;
  if(isAdmin){
    const users = await User.find();
    res.send(users);
  }else{
    const users = await User.find({type: 'public'});
    res.send(users);
  }
}

// Update a user
const editUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const image = req.file? "http://localhost:4000/public/userImages/" + req.file.filename : req.body.image;

    const updateUser = await User.findByIdAndUpdate(_id, {...req.body, image}, {
      new: true,
    });

    console.log(updateUser);
    res.send(updateUser);
  } catch (err) {
    res.send(err);
  }
};

//Get all public users for the normal user.
const get_public_data =  async(req,res) => {
  try{

   const isAdmin = req.user.is_admin;
   if(!isAdmin){
   const get_public_user = await User.find({type:'public'});
   console.log(get_public_user);
   res.send(get_public_user);
   }
   const users = await User.find();
   res.send(users);
  } 
  catch(err){
    res.send(err);
  }
}

module.exports = {
  insertUser,
  logIn,
  signOut,
  get_data,
  get_user_data,
  editUser,
  get_all_users,
  get_public_data
};
