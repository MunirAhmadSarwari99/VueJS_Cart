window.addEventListener('load', () => {
    Vue.component('VueCart', {
        props: {
          cart: {
              type: Array,
              required: true,
              default: []
          },
          title: {
            type: String,
            required: true
          },
          type: {
              type: String,
              required: true
          },
        },
        computed: {
            cartTotal(){
                let total = 0;
                this.cart.forEach((item) => {
                    total += parseFloat(item.price, 10);
                });
                return total.toFixed(2);
            },
            isCart(){
                return this.type == "cart";
            },
            isSaved(){
                return this.type == "saved";
            }
        },
        methods: {
            removeFromeCart(index){
               return  this.cart.splice(index, 1);
            },
            ChangeCart(index){
                const item = this.removeFromeCart(index);
                this.$emit('itemchange', item[0], this.type);
            },
        },
       template: `
       <div class="row">
          <h2>{{ title }} ( {{ cart.length }} )</h2>
          <strong v-if="! cart.length">No Item In Cart</strong>
          <div class="col-md-3" v-for="(item, index) in cart">
            <div class="card p-1">
                <img v-bind:src="item.Image" class="card-img-top w-25" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{ item.Name }}</h5>
                    <p class="text-danger">{{ item.price }} TL</p>
                    <a href="#" class="card-link" v-on:click="removeFromeCart(index)">Delete</a>
                    <a href="#" class="card-link" v-on:click="ChangeCart(index)" v-if="isCart">Save For Later</a>
                    <a href="#" class="card-link" v-on:click="ChangeCart(index)" v-if="isSaved">Move to Cart</a>
                </div>
            </div>
          </div>
          <div class="col-md-12" v-if="cart.length">
            <p class="float-end mt-2 fw-bold">
                Subtotal ({{ cart.length }} items): <span class="text-danger">{{ cartTotal }} TL</span>
            </p>
          </div>
       </div>
       `
    });
   window.vue = new Vue({
       el: "#app",
       name: "Cart",
       data: {
           isloading: true,
           cart :[],
           saved: []
       },
       methods: {
           handleItemChange(item, cartType){
               if (cartType === 'cart'){
                   this.saved.push(item);
               }else {
                   this.cart.push(item);
               }
           },
       },
       created(){
           setTimeout( () => {
               fetch('./data.json')
                   .then((res) => { return res.json() })
                   .then((res) => {
                       this.isloading = false;
                       this.cart = res.Cart;
                       this.saved = res.Saved;
                   })
           }, 1000);
       }
   });
});