import jwt from 'jsonwebtoken'
const context = ({ req }) => {
    const token = req.headers.authorization || '';
    if(!token){
      return "Sorry no token found";
    }
    try {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return {user} ;
    } catch (error) {
      return "Token expired or mismatch"
    }
}
export default context;