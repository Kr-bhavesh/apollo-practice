import expense_model from "../models/expense.js";
const resolvers = {
    Query:{
       async allexpense(){
        return  await expense_model.find()
       },
       async getexpense(parent,args){
        // const {ID} = args
        return await expense_model.findById(args.id)
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