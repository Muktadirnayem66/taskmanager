import jwt from 'jsonwebtoken'

const authUser = async(req, res, next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message:"Unauthorize user login again"})
    }
    try {
        const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        
        req.headers.email = decode_token.email 
        next()
        
    } catch (err) {
        console.log(err);
        res.json({success:false, message:err.message})    
    }

}

export default authUser