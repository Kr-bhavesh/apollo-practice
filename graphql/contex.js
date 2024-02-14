import jwt from "jsonwebtoken";
const getUser = async (token) => {
    try {
      if (token) {
        const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return user;
      }
      return "not authenticated";
    } catch (error) {
      return "error"
    }
  };
const contexts = async ({ req, res }) => {
    //   console.log(req.body.operationName);
    
    // get the user token from the headers
    const token = req.headers.authorization || '';
  
    // try to retrieve a user with the token
    const user = await getUser(token);
  
    if (!user) {
     return "un authenticated"
    }
  
    // add the user to the context
    return { user };
  };
export default contexts;
  