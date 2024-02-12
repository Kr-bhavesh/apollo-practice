import { mongoose} from "mongoose";
const expense_schema = mongoose.Schema({
    u_name:{
       type:String,
       required:true
    },
    expense:{
          type:Number,
          required:true
    }
})
const expense_model = mongoose.model('Expense',expense_schema)
export default expense_model;