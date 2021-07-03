import request from "../../utils/request"


export function subscribe(email, drama) {
	return request.get(`/api/tourist/subscribe?email=${email}&drama=${drama}`)
}

export function confirmSubscribe(code) {
	return request.get(`/api/tourist/subscribe/confirm?code=${code}`)
}
