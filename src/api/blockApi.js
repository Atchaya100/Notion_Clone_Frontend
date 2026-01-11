import axiosInstance from './axiosInstance';

const saveOrUpdateBlock = (data) => {
    try{
        return axiosInstance.post('/api/block/save',data,{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      
        
    });
      
    }
    catch(err){
        return "error"
    }
   
}

const fetchBlocks = (pageid) =>{
    return axiosInstance.get(`/api/block/retrieve/${pageid}`,{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}

const deleteBlockById = (id,pageId) => {
    return axiosInstance.delete(`/api/block/delete/${id}/${pageId}`,{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
    });
}


export { saveOrUpdateBlock,fetchBlocks,deleteBlockById};