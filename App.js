new Vue({
	el: '#app',
	data: 	{				
		entidades : [],
		showModal: false,
		name : ''
	},
	created: function() {
		var that = this;				
		axios.get('https://localhost:44378/api/Entity', {
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
			idPais: '',
			idProvince: '',
			city: '',
			postalCode: '',
			adress: '',
			telephone: '',
			email: '',
			logo: '',
			active: '',
			errorBool : true,
			errors: [],
		};
	},
	methods : {
		submit(e) {
			this.errors = [];	
			if (!this.name || !this.idEntityGroup || !this.idProvince || !this.telephone || !this.email || !idPais) {						
				this.errorBool = false;
				if (!this.name && !this.errorBool) {
					this.errors.push('El nombre es obligatorio.');
					this.errorBool = true;
				};
				if (!this.idEntityGroup && !this.errorBool) {
					this.errors.push('El grupo es obligatorio.');
					this.errorBool = true;
				};
				if (!this.idPais && !this.errorBool) {
					this.errors.push('El pais es obligatorio.');
					this.errorBool = true;
				};
				if (!this.idProvince && !this.errorBool) {
					this.errors.push('La provincia es obligatoria.');
					this.errorBool = true;
				};
				if (!this.telephone && !this.errorBool) {
					this.errors.push('El teléfono es obligatorio.');
					this.errorBool = true;
				};
				if (!this.email && !this.errorBool) {
					this.errors.push('El email es obligatorio.');
					this.errorBool = true;
				};				
			}
			else {
				axios.post('https://localhost:44378/api/Entity', { 
					name: this.name,
					idEntityGroup: this.idEntityGroup,
					idProvince: this.idProvince,
					city: this.city,
					postalCode: this.postalCode,
					adress: this.adress,
					telephone: this.telephone,
					email: this.email,
					logo: this.logo
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
		
	