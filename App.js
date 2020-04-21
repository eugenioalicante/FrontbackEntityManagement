new Vue({
	el: '#app',
	data: 	{				
		entidades : [],
		showModal: false,
		name : ''
	},
	created: function() {
		var that = this;				
		axios.get('http://bankentitymanagement.azurewebsites.net/api/Entity', {
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LRk3GRkNBlJn0DFVo5g58l9MPAdYpCQe1sddNVmGgzY'												    
			}
		})
		.then(function (response) {
			that.entidades = response.data;
		})
		.catch(function (error) {
			console.log(error);
		})			   
	}
});	
				
Vue.component('modal', {
	template: '#modal-template',
	data() {		   
		return {
			name: '',             
			idEntityGroup: '',
			idProvince: '',
			city: '',
			postalCode: '',
			telephone: '',
			email: '',
			logo: '',
			active: '',
			errors: [],
		};
	},
	methods : {
		submit(e) {
			this.errors = [];	
			if (!this.name) {						 				 
				if (!this.name) {
					this.errors.push('El nombre es obligatorio.');
				}
			}
			else {
				axios.post('http://bankentitymanagement.azurewebsites.net/api/Entity', { 
					name: this.name,
					idEntityGroup: this.idEntityGroup,
					idProvince: this.idProvince,
					city: this.city,
					postalCode: this.postalCode,
					telephone: this.telephone,
					email: this.email,
					logo: this.logo,
					active: this.active,
				}, {
					headers: {						
						'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LRk3GRkNBlJn0DFVo5g58l9MPAdYpCQe1sddNVmGgzY'							
					}
				})
				.then(res => {     					
					this.$emit('close');							
				})
				.catch(function (error) {					
					console.log(error);					
				})	
			}
		}
	}
});
		
	