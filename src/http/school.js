import request from "./axios";

export function getAll(){
	return request({
		url: '/api/school/all',
		method: 'get',
	});
}

export function getOne(id){
	return request({
		url: `/api/school/one?id=${id}`,
		method: 'get',
	});
}

export function delOne(data){
	return request({
		url: `/api/school/delete?id=${data}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/school/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/school/edit',
		method: 'post',
		data
	});
}

export function queryByEnable(enable) {
	return request({
		url: `/api/school/enable?enable=${enable}`,
		method: 'get',
	});
}

