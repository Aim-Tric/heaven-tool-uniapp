import request from "../utils/request"

export function findDrama(drama) {
	return request.get(`/api/dramas/find?drama=${drama}`);
}

export function page(page) {
	return request.get(`/api/dramas?page=${page}`);
}

export function searchByKeyword(keyword) {
	return request.get(`/api/dramas/s?keyword=${keyword}`);
}
