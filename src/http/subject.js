import request from "./axios";


export function getOne(id){
	return request({
		url: `/api/subject/one?id=${id}`,
		method: 'get',
	});
}

export function addOne(data){
	return request({
		url: '/api/subject/edit',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/subject/edit',
		method: 'post',
		data
	});
}

export function getPage(data){
	return request({
		url: '/api/subject/page',
		method: 'post',
		data
	});
}


