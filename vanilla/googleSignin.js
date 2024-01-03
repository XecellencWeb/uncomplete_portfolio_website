
import axios from 'axios';
import { authBox } from './box/authbox';
import { auth } from '../axios/defaults';

export const getUser = async (res,callback)=>{
  authBox(102)
    try {
      
     const {data} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`, {
        headers: {
            Authorization: `Bearer ${res.access_token}`,
            Accept: 'application/json'
        }
    })
    const response = await auth.post(`/auth/emailsignin`,data)
    callback(response)
    } catch (err) {
      authBox(err.status,err.response.data)
    }
  }
 

  