const bcrypt=require('bcrypt');

exports.hashpassword=async(password)=>{
    try{
        const saltpassword=10;
        const hashedpassword=await bcrypt.hash(password,saltpassword);
        return hashedpassword
    }catch(error){
        console.log(error);
    }
};

exports.comparepassword=async (password,hashedpassword) => {
    return bcrypt.compare(password,hashedpassword);
};