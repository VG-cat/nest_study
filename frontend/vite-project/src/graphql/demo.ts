import { gql } from "@apollo/client";

export const FIND = gql`
    query getUserById($id:String!){
  a:getUserById(id: $id){
    name
  }
}
`;

export const GET_SIGNATURE = gql`
   query getSignature{
  getSignature{
    exprie,
    signature,
    accessid,
    dir,
    host
  }
}
`;