import expense_model from "../models/expense.js";
import Redis from 'ioredis'
import { configDotenv } from "dotenv";
configDotenv();
const redis= new Redis({
  host:process.env.HOST,
  port:process.env.REDIS_PORT,
  password:process.env.PASSWORD
})
const resolvers = {
    Query:{
       async allexpense(parent,args,context){
        console.log(context,"ee");  
        if(!context.user)
        {
          throw new Error("sorry authentication is required")
        }
        try {
          return  await expense_model.find();
        } catch (error) {
           console.log(error); 
        }
      },
       async getexpense(parent,args){
        // const {ID} = args
        const cachekey = `user:${args.id}`
        const cachedData = await redis.get(cachekey)
        console.log(cachedData);
        if (cachedData) {
          // Data found in cache, return it
          return JSON.parse(cachedData);
          } else {
          // Data not found in cache, fetch and store it
          const userData = await expense_model.findById(args.id)
          console.log(userData);
          await redis.set(cachekey, JSON.stringify(userData), 'ex', 3600); // Cache for 1 hour
          return userData;
          }
        // return await expense_model.findById(args.id)
       }
    },
    Mutation:{
    addexpense: async (parent, args) => {
            const { u_name,expense } = args;
            const store = new expense_model({
              u_name,
              expense,
            });
            await store.save();
            return store;
          },
    dltexpense: async (parent,args) =>{
        const {ID} = args;
        const delete_exp = await expense_model.findByIdAndDelete(ID);
        return "user deleted"
    },
    updexpense: async (parent,args) =>{
        const {ID} = args;
        const upd_exp = await expense_model.findByIdAndUpdate(ID,args);
        return upd_exp;
    }
}
}
export default resolvers;