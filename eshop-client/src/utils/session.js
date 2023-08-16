function saveSession(name, data) {    //data.loginUser.tokenData.token
	console.log('saveSession', name, data)
	sessionStorage.setItem(name, data)
}

function recoverSession(name) { 
	return sessionStorage.getItem(name)
}

function deleteSession() {
	sessionStorage.clear()
}

function storeUserDataOnSessionStorage(data) {
	const replacer = (key, value) => {
		if (typeof value === 'boolean' || typeof value === 'number') {
			return String(value);
		}
		return value
	}
	sessionStorage.setItem('userData', JSON.stringify(data, replacer))
}

function recoverUserDataFromSessionStorage() {
	const reviver = (key, value) => {
		if (value === 'true') {
			return true
		}
		if (value === 'false') {
			return false
		}
		return value
	};
	return JSON.parse(sessionStorage.getItem('userData'), reviver) || {}
}

function addproductOnSessionStorage(obj) { 
	if(!isObjectEmpty(obj)) {
		return sessionStorage.setItem(obj.name, JSON.stringify(obj)) 
	} else { 
		return console.log("Only Object can be passed", obj) 
	}
} 

function getCartFromSessionStorage() {
	const result = [] 
	const ignore = ["userData", "token", "decodedToken"]
	for(let i = 0; i < sessionStorage.length; i++) {
		const key = sessionStorage.key(i)
		 
		if(!ignore.includes(key)) {
			console.log('key', key) 
			result.push(JSON.parse(sessionStorage.getItem(key)) || {})
		}
		result.cost = result.reduce((total, current) => { return total + current }, 0)
	}
	return result
}

const isObjectEmpty = (objectName) => {
	return (
	  objectName &&  
	  Object.keys(objectName).length === 0 &&
	  objectName.constructor === Object
	) 
  }

function deleteUserDataFromSessionStorage() {
	sessionStorage.removeItem('userData')
}

module.exports = {
	saveSession,
	recoverSession,
	deleteSession,
	storeUserDataOnSessionStorage,
	recoverUserDataFromSessionStorage,
	deleteUserDataFromSessionStorage,
	addproductOnSessionStorage,
	getCartFromSessionStorage
}