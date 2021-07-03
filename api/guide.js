import request from "../utils/request"

export function listApplication() {
	return request.get('/api/system/application/all');
}
