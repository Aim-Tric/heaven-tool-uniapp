var request = {}

const baseUrl = ""
	
request.get = function(url) {
	return new Promise(function(resolve, reject) {
		uni.request({
			method: 'GET',
			url: baseUrl + url,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

request.post = function(url, data) {
	return new Promise(function(resolve, reject) {
		uni.request({
			method: 'POST',
			url: baseUrl + url,
			data: JSON.stringify(data),
			dataType: 'json',
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default request
