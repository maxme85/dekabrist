let mxform = Vue.component('mxform', {
    template: `
        <div class="mxform">
          <h2>{{title}}</h2>
          <div class="pretitle">{{pretitle}}</div>

          <form class="form" @submit.prevent="submitForm">
          <div v-for="input in formData" class="input_wrapper" :class="{required : input.required}">
              <textarea v-if="input.type == 'textarea'" v-on:input="check_form" v-model="input.value" :placeholder="input.caption"></textarea>
              <input v-else :type="input.type" v-on:input="check_form" :required="input.required" v-model="input.value" :placeholder="input.caption" />
          </div>
          <div class="input_wrapper">
              <button class="btn" type="submit" :disabled="!checked">{{btn_title}}</button>
          </div>

          
      </form>
      <div class="responce" :class="{on: informWindow == true}">
        <div class="innerWrapper">
            <button v-on:click="changeStatus" class="close">x</button>
            <h2>{{responceOk}}</h2>
        </div>
    </div>
        </div>
    `,
    props: {
        title: {
            type: String,
            default: ''
        },
        pretitle: {
            type: String,
            default: ''
        },
        inputs: Array,
        btn_title: {
            type: String,
            default: 'Отправить'
        },
        responceOk: {
            type: String,
            default: 'Форма успешно отправлена'
        }

    },
    data() {
        return {
            formData: this.inputs,
            formState: false,
            checked: false,
            informWindow: false,
            somestatus: ''
        }
    },
    methods: {
        submitForm() {
            this.formData = this.inputs;
            this.$emit('form_data', this.formData);
            this.informWindow = true;
            this.formState = false;
            this.somestatus = 'ok';
        },
        check_form() {
            this.formData = this.inputs;
            let req_fields = this.inputs.filter(elements => elements.required == true);
            let filled = 0;
            let count_of_required_fields = req_fields.length;
            
            req_fields.forEach(element => {
                
                
                if (element.value !== '') {
                    if (element.type == 'email') {
                        if (/^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9\-_\.]+\.[a-zA-Z0-9\-_\.]+$/.test(element.value)) {
                            filled=filled+1; 
                        }
                    }else if(element.type == 'tel'){
                        element.value = element.value.replace(/[^\d]/g,'');
                        element.value = element.value.replace(/^(\d{11}).+$/g,'$1');
                        element.value = element.value.replace(/^[9876543210]/,'+7');
                        element.value = element.value.replace(/^\+7(\d{3})(\d)/,"+7 ($1) $2");
                        element.value = element.value.replace(/^(\+7 \(\d{3}\))(\d{3})/,"$1 $2");
                        element.value = element.value.replace(/(\d{3})(\d{2})/,"$1-$2");
                        element.value = element.value.replace(/(\d{2})(\d{2})/,"$1-$2");
                        if (element.value.length > 17) {
                            filled=filled+1;
                            console.log('tel');
                        }
                        
                    }else{
                        filled=filled+1; 
                    }
                    
                }
			});

            //console.log(count_of_required_fields, filled);

            if (count_of_required_fields == filled) {
				this.checked = true;
			}else{
				this.checked = false;
			}

            

        },
        changeStatus() {
            this.informWindow = false;
            this.formState = false;
            //empty all values
            this.formData.forEach(element => {
                element.value = '';
            });
            this.check_form();
        }
    }
});



export default {
    mxform
}