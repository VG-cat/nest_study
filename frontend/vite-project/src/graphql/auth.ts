import { gql } from "@apollo/client";

export const GET_AUTHCODE = gql`
    mutation getSignature($tel:String!){
  getAuthCode(tel:$tel)
}
`;


export const VALIDATE_CODE = gql`
   mutation getSignature($tel:String!, $code:String!){
  validateCode(tel:$tel,code:$code)
}
`;

