const loggedInUser = async(req,res,next)=>{
    const user = req.user ;
    if(user._id === req.params.id)
    {
        next();
    }
    else{
        res.json({
            message:"You can only edit your own account"
        })
    }
}

module.exports = loggedInUser;