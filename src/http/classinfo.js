import instance from "./axios";
import request from "./axios";
const adminLogin=(data)=>{
    return instance.request({
        url:'',
        method:'',
        data
    })
}

const classinfoAll=(data)=>{
    return instance.request({
        url:'api/classinfo/all',
        method:'get',
        data
    })
}
const classinfoone=(data)=>{
    return instance.request({
        url:'api/classinfo/one',
        method:'get',
        data
    })
}
const classinfoAdd=(data)=>{
    return instance.request({
      url:'api/classinfo/add',
      method :'post',
      data
  })
  }
  const classinfoPage=(data)=>{
    return instance.request({
      url:'api/classinfo/page',
      method :'post',
      data
  })
  }
  const classinfoEdit=(data)=>{
    return instance.request({
      url:'api/classinfo/edit',
      method :'post',
     data
  })
  } 
  const classinfoDelId=(params)=>{
    return instance.request({
        url:'api/classinfo/delete',
        params
    })
}


export function queryBySchoolName(schoolName,current,size) {
	return request({
		url: `/api/classinfo/page/school?current=${current}&school=${schoolName}&size=${size}`,
		method: 'get',
	});
}

export {
    classinfoAll,
    classinfoAdd,
    classinfoEdit,
    classinfoDelId,
    adminLogin,
    classinfoPage,
    classinfoone
} 