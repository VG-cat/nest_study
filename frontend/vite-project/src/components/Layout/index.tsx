import { ROUTE_CONFIG } from '@/routes';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import React, {useState, useEffect} from 'react';
import { useOutlet } from 'react-router-dom';


const Layout = () => {
   const [state, setState] = useState();
   const outlet = useOutlet();
   useEffect(() => {

   },[])

   return (
       <ProLayout 
        route={{
            path:'/',
            routes:ROUTE_CONFIG
        }}
       >
         <PageContainer>
            {outlet}
         </PageContainer>
       </ProLayout>
   );
};

export default Layout;