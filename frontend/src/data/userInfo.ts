import axios from "axios";
import { headers } from '@/utils/auth-header-utils';

export const fetchUserInfo = async () => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/get-user-info`, {headers});
   if (response.data.success === true) {
      console.log(response.data.data)
      return response.data.data;
   } else {
      return null
   }
};
