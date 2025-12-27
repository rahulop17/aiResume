import jwt from "jsonwebtoken";


const protect = async(req , res , next) =>{
    const token = req.headers.authorization;
    console.log("Protect middleware invoked. Token:", token);

    if(!token){
        return res.status(401).json({message : 'Unauthroised'});

    }
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        console.log("Token decoded successfully:", decoded);
        req.userId = decoded.userId;
        next()
    }
    catch(error){
        console.error("Token verification failed:", error.message);
        return res.status(401).json({message : 'Unauthorized'});


    }
}

export default protect;

