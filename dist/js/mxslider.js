// <mxslider
// :interval="0"
// :slides-per-page="3"
// :slides="[
// {img:'1.jpg',url:'#'},
// {img:'favicon.png',url:'#'},
// {img:'favicon.png',url:'#'},
// {img:'favicon.png',url:'#'},
// {img:'favicon.png',url:'#'}
// ]"
// >
// </mxslider>

let mxslider = Vue.component('mxslider',{
    template: `
        <div class="mxslider" :class="className" >
            <h1>Mx slider</h1>
            <ul :style="{ transform: 'translateX('+ shift +'%)'}">
            <slot></slot>
                <li v-for="(slide, index) in slides" :class="{current: index == currentSlide}">
                    <a :href="slide.url">
                        <img :src="'img/'+slide.img"/>
                    </a>
                </li>
            </ul>
            <button 
                @click="prevSlide"
                :disabled="!currentSlide"
            ><</button> 
            <button 
                @click="nextSlide"
                :disabled="currentSlide > totalSlides-slidesPerPage-1"
            >></button>
        </div>
    `,
    props:{
        interval:{
            type: Number,
            default: 3
        },
        slidesPerPage: {
            type: Number,
            default: 1
        },
        slides:[]
    },
    data() {
        return{
            currentSlide: 0
        }
    },
    methods:{
        nextSlide(){
            //if it last
            if (this.currentSlide < this.totalSlides - this.slidesPerPage) {
                this.currentSlide++;
            }
            
           
            
        },
        prevSlide(){
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        }
    },
    computed:{
        className(){
            return 'spp_'+this.slidesPerPage;
        },
        shift(){
            return 100/this.slidesPerPage*(-this.currentSlide);
        },
        totalSlides(){
            return this.slides.length;
        }
    },
    created(){
        let steps = this.totalSlides - this.slidesPerPage;
        
        let creaser = 1;

       
        let interval = setInterval(()=>{
           
            if (this.currentSlide >= this.totalSlides - this.slidesPerPage) {
                creaser = -1;
            }

            if (this.currentSlide <= 0) {
                creaser = 1;
            }

            

           
            this.currentSlide = this.currentSlide + creaser;
           

           console.log(this.currentSlide);
        }, this.interval * 1000);

        if (this.interval == 0) {
            clearInterval(interval);
        }
        if (this.totalSlides <= this.slidesPerPage) {
            clearInterval(interval);
        }
    }
});

export default {
    mxslider
}