import FaceBook from './index.js';
const fbInstance = new FaceBook();

export default async function() {
	let result = null;
	if (window.FB === undefined) {
		result = await fbInstance.initSdk();
	} else {
		let checkStatus = await fbInstance.checkLoginStatus().then(res => res );
		if (checkStatus.success) {
			let profile = await fbInstance.getFbProfile().then(res => res);
			result = { 
				success: true,  
				authInfo: checkStatus.authInfo,
				profile
			}
		} else {
			result = checkStatus;
		}
	}
	return result;
}