// import {gql} from'@apollo/server'
const typeDefs=`
type Expense{
    u_name:String,
    expense:Int
}
type Query {
    allexpense:[Expense],
    getexpense(id:ID!):Expense
}
type Mutation{
    addexpense(u_name:String,expense:Int):Expense,
    dltexpense(ID:ID!):String,
    updexpense(ID:ID!,u_name:String,expense:Int):Expense
}
`;
export default typeDefs;