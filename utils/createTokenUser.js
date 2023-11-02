const createTokenUser= (user)=>{
    return {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
    }  
}

module.exports= createTokenUser