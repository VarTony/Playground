class Serializetion {

		constructor() {
			this.q = [];
			this.nodeNames = ['INPUT', 'file', 'TEXTAREA', 'SELECT', 'BUTTON'];
			this.inputElemTypes1 = ['text', 'tel', 'email', 'hidden', 'password', 'button', 'reset', 'submit'];
			this.inputElemTypes2 = ['checkbox', 'radio'];
			this.selectElemTypes = ['select-one', 'select-multiple'];
			this.buttonElemTypes = ['reset', 'submit', 'button'];
		}

		serialize(form) {

			if(form.nodeName !== 'FORM') return 'Аргументом долна быть форма';

			form.childNodes.forEach( element => { 
				if(this.nodeNames.includes(element.nodeName)  && element.name) {
					console.log(element.options);
					if((element.nodeName === this.nodeNames[0] && this.inputElemTypes1.includes(element.type)) && element.value) 
						this.MFITAB(element);
					if((element.nodeName === this.nodeNames[0] && this.inputElemTypes2.includes(element.type)) && element.checked) 
						this.MFITAB(element);
					if(element.nodeName === this.nodeNames[2]) 
						this.MFITAB(element);
					if(element.nodeName === this.nodeNames[3] && this.selectElemTypes.includes(element.type))
						this.methodForSelect(element);
					if(element.nodeName === this.nodeNames[4] && this.buttonElemTypes.includes(element.type))
						this.MFITAB(element);
				}  	

			});
			return this.q.join('&');
		}

		//Method for inputs, textarea and buttoms;
		MFITAB(element) { 
			this.q.push(`${element.name}=${encodeURIComponent(element.value || 'default_value')}`);
		}

		methodForSelect(element) {
			if(element.type === 'select-one')
                this.q.push(`${element.name}=${encodeURIComponent(element.value)}`);
  			if(element.type === 'select-multiple') { 
				for (let j = element.options.length - 1; j >= 0; j--) {
					if (element.options[j].selected) 
						this.q.push(`${element.name}=${encodeURIComponent(element.options[j].value)}`);
                }	
			}
		}	

}











// export default Serializetion;