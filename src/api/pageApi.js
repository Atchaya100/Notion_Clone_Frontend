import axiosInstance from './axiosInstance';

const createPage = (data) => {
    return axiosInstance.post('/api/page/create',data,{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}

const fetchPages = (userid) =>{
    console.log(userid)
    return axiosInstance.get(`/api/page/pages/${userid}`,{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}

const updateName = (pageId,newName) => {
    return axiosInstance.put(`/api/page/rename`,{newName:newName,pageId},{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}

export { createPage,fetchPages,updateName };