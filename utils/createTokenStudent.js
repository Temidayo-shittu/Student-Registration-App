const createTokenStudent = (user)=>{
    return {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        nationality: user.nationality,
        home_address: user.home_address,
        city: user.city,
        state: user.state,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        age: user.age,
        faculty: user.faculty,
        department: user.department,
        current_level: user.current_level,
        matric_number: user.matric_number,
        guardian_fullname: user.guardian_fullname,
        guardian_mobile: user.guardian_mobile
    }  
}

module.exports= createTokenStudent