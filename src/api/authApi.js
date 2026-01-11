
import axiosInstance from './axiosInstance';


const RegisterApi = (email,username, password) => {
    return axiosInstance.post('/api/auth/register', {
        email,username,
        password
    });
}

const LoginApi = (email, password) => {
    try{
    return axiosInstance.post('/api/auth/login', {
        email,
        password
    },{ withCredentials: true });
}catch(err){
    console.log(err);   
}
}

export { RegisterApi,LoginApi };