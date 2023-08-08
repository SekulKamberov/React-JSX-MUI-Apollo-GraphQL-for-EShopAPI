

function saveSession(name, data) {    //data.loginUser.tokenData.token
	console.log('saveSession', name, data)
	sessionStorage.setItem(name, data)
}

function recoverSession(name) {
	let opa  = sessionStorage.getItem(name)
	console.log('opa', opa)
	return  opa
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

function deleteUserDataFromSessionStorage() {
	sessionStorage.removeItem('userData')
}

module.exports = {
	saveSession,
	recoverSession,
	deleteSession,
	storeUserDataOnSessionStorage,
	recoverUserDataFromSessionStorage,
	deleteUserDataFromSessionStorage
}