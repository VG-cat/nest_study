import { gql } from "@apollo/client";

export const FIND = gql`
    query getUserById($id:String!){
  a:getUserById(id: $id){
    name
  }
}
`;