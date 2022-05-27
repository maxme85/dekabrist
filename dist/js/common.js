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
		errors: -1,
		calcs:[{
			title:'Сдача номеров гостиницы',
			min: 1,
			max: 6,
			current: 1,
			step: 1,
			delta: 65700,
			sum: 65700,
			items:[
				{count: 1, current: true},
				{count: 2, current: false},
				{count: 3, current: false},
				{count: 4, current: false},
				{count: 5, current: false},
				{count: 6, current: false}
			]
		},{
			title:'Субаренда апартаментов',
			min: 1,
			max: 6,
			current: 1,
			step: 1,
			delta: 51000,
			sum: 51000,
			items:[
				{count: 1, current: true},
				{count: 2, current: false},
				{count: 3, current: false},
				{count: 4, current: false},
				{count: 5, current: false},
				{count: 6, current: false}
			]
		},{
			title:'Субаренда квартир долгосрочно',
			min: 1,
			max: 6,
			current: 1,
			step: 1,
			delta: 40000,
			sum: 40000,
			items:[
				{count: 1, current: true},
				{count: 2, current: false},
				{count: 3, current: false},
				{count: 4, current: false},
				{count: 5, current: false},
				{count: 6, current: false}
			]
		}]
	},
	methods: {
		change_current_item(item,calc){
			calc.items.forEach(element => {
				element.current = false;
			});
			
			
			item.current = true;
		},
		range_change(calc){
			
			calc.sum = calc.current * calc.delta;
			let itemcount = calc.current;
			calc.items.forEach(element => {
				console.log(element);
				if (element.count == calc.current) {
					element.current = true;
				}else{
					element.current = false;
				}
			});

		},



		set_calc_current(calc, current){
			calc.current = current;
			calc.sum = calc.current * calc.delta;
			calc.items.forEach(element => {
				console.log(element);
				if (element.count == calc.current) {
					element.current = true;
				}else{
					element.current = false;
				}
			});
		},
		step_changer(item){
			let curr;
			//checkin
			item.forEach(element => {
				if (element.current) {
					curr = element.price;
				}
			});
			return curr;
			console.log(curr);
		},
		get_form_data(data) {
			//send request
			 postData('mail.php', {data})
			.then((data) => {
				this.popup_current_message = data.responce;
			});
			//send back to popup status
			
			console.log('popup_current_message: ',this.popup_current_message);
		}
	},
	computed: {
		
	}
});


// let slider = tns({
// 	container: '.my-slider',
// 	items: 3,
// 	slideBy: 'page',
// 	controls: true,
// 	controlsPosition: 'bottom',
// 	nav: false,
// 	mouseDrag: true
// });


