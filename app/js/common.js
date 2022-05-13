import popup from './popup.js'
import mxform from './form.js'
import mxslider from './mxslider.js'





async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}







var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!',
		current_popup: 0,
		popup_visible: false,
		popup_current_message: '',
		errors: -1
	},
	methods: {
		get_form_data(data) {
			//send request
			 postData('mail.php', {data})
			.then((data) => {
				this.popup_current_message = data.responce;
			});
			//send back to popup status
			
			console.log('popup_current_message: ',this.popup_current_message);
		}
	}
});


let slider = tns({
	container: '.my-slider',
	items: 3,
	slideBy: 'page',
	controls: true,
	controlsPosition: 'bottom',
	nav: false,
	mouseDrag: true
});


