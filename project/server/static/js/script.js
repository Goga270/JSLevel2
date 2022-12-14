import {bus} from "./bus.js";
let urlbase = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';

let BaseUrl = "http://localhost:8000";
let Goods = "/goods.json";
let Basket = "/basket-good"

function service(url, method = 'GET', body){
    return fetch(url,{
        headers:Object.assign({}, (body)?{
            'Content-Type': 'application/json; charset=utf-8'
        }: {}),
        method,
        body: JSON.stringify(body)
    }).then((res)=>{
        return res.json();
    });
}

Vue.component('top-header', {
    props: {
        'value': String,
        'searchValue': String
    },
    data: function () {
        return {
            searchLine: "",
        }
    },
    methods: {
        clickOnCartIconn() {
            bus.$emit('click-on-cart-icon');
        },
        filterSearch() {
            bus.$emit('filter-search', this.searchLine );
        }
    },

    template: ' <header>\n' +
        '    <div class="leftHeader">\n' +
        '      <img src="/images/header/cake-slice.png" alt="logo" class="logo_img">\n' +
        '      <div class="searchInput ">\n' +
        '        <search-input v-model="searchLine"></search-input>\n' +
        '      </div>' +
        '       <img src="/images/header/search.png" v-on:click="filterSearch" alt="search" class="searh_img">\n' +
        '    </div>\n' +
        '    <div class="rightHeader">\n' +
        '      <img src="/images/header/bars.png" alt="menu" class="menu_img">\n' +
        '      <img src="/images/header/user.png" alt="user" class="user_img">\n' +
        '      <img src="/images/header/cart.png" v-on:click="clickOnCartIconn" alt="cart" class="cart_img">\n' +
        '    </div>\n' +
        '  </header>'
});
Vue.component('Main', {});

Vue.component('Footer', {});

Vue.component('search-input', {
    props: [
        'value'
    ],
    data() {
        return {
            searchLine: "",
        }
    },

    template: `<input type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">`
});

Vue.component('goods-item', {
    props:{
        'item': Object
    },
    data: function (){
        return{

        }
    },
    methods:{
        pushGoodToCart(item){
            service(BaseUrl+Basket, 'PUT', {id: item});
        },

    },

    template: `<article class="goods-item">
        <div class="cardImg">
          <img src="/images/card/1.jpg" alt="#">
          <div class="cardImgDark">
            <button>
              <img src="/images/header/cart.png" alt="">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="cardInfo">
          <div class="cardInfoTitle">
            {{item.product_name}}
          </div>
          <div class="cardInfoPrice">
            {{item.price}}
          </div>
          <button class="cardBuy" v-on:click="pushGoodToCart(item.id)">
            ????????????
          </button>
        </div>
      </article>`
});

Vue.component('goods-list', {
   props:[
    'cartIsVisible',
    'countItems',
   ],
    data: function (){
       return{

       }
    },
    methods:{

    },
    template:`
<div class="goods-list" v-if="!cartIsVisible && countItems!=0">
    <slot></slot>
 </div>               
`
});

Vue.component('cart-list', {
    props:[
        'cartIsVisible',
        'countItems',
    ],
    data(){
        return{
            basketGoodsItems:[]
        }
    },
    methods:{
        updateCart(){
            service(BaseUrl+Basket).then((result)=>{
                this.basketGoodsItems = result;
            });
        }
    },
    created(){
      bus.$on('update-cart', this.updateCart);
    },
    mounted(){
        service(BaseUrl+Basket).then((result)=>{
            this.basketGoodsItems = result;
        });
    },
    template:`
<div class="cart-list">
    <div class="cart-listWrap">
        <cart-item v-for="item in basketGoodsItems" v-bind:item="item"></cart-item>
    </div>
 </div>`
});

Vue.component('cart-item', {
    props:[
        'item'
    ],
    data(){
        return{

        }
    },
    methods:{
        addOneMoreItemToCart(item){
            service(BaseUrl+Basket, 'PUT', {id: item}).then((res)=>{
                bus.$emit('update-cart');
            });
        },
        deleteOneItemToCart(item){
            service(BaseUrl+Basket, 'DELETE', {id: item}).then((res)=>{
                bus.$emit('update-cart');
            });
        },
    },
    template:`<article class="cart-item">
        <div class="cardImg">
          <img src="/images/card/1.jpg" alt="#">
        </div>
        <div class="cardInfo">
          <div class="cardInfoTitle">
            {{item?.data?.product_name}}
          </div>
          <div class="cardInfoCartCount">{{item?.count}}</div>
          <div class="cardInfoPrice">
            {{item?.total}}
          </div>
          <button class="cardBuy" v-on:click="addOneMoreItemToCart(item.id)">
            ???????????????? ??????
          </button>
          <button class="deleteIcon" v-on:click="deleteOneItemToCart(item.id)" >?????????????? ??????????</button>
        </div>
      </article>`
})

Vue.component({

})

export const app = new Vue({
    el: "#app",
    data: {
        name: '',
        goods: [],
        filterGoods: [],
        cartGoods: [],
        searchLine: 'searchLine',
        cartIsVisible: false,
        totalPrice: 0,
        filteredItems: [],
    },
    components: {},
    methods: {
        makeGetRequest(url, method='GET', body) {
            service(url, method, body).then((result)=>{
                this.goods = result;
                this.filteredItems = result;
            });
        },
        cartIconClick() {
            if (this.cartIsVisible) {
                this.cartIsVisible = false;
            } else {
                this.cartIsVisible = true;
            }
        },
        calculatePrice() {
            if (this.cartIsVisible) {
                this.totalPrice = this.cartGoods.reduce((prev, {price}) => {
                    return prev + price;
                }, 0);
            } else {
                this.totalPrice = this.filteredItems.reduce((prev, {price}) => {
                    return prev + price;
                }, 0);
            }
            return this.totalPrice;
        },
        pushGoodToCart(product_name) {
            for (let i = 0; i < this.goods.length; i++) {
                if (this.goods[i].product_name == product_name) {
                    this.cartGoods.push(this.goods[i]);
                    return
                }
            }
        },
        filterItems(value) {
            this.filteredItems = this.goods.filter(({product_name}) => {
                const regexp = new RegExp(value, 'i');
                return regexp.test(product_name);
            });
            this.calculatePrice();
        }
    },
    created() {
        bus.$on('click-on-cart-icon', this.cartIconClick);
        bus.$on('filter-search', this.filterItems);
        bus.$on('push-good-to-cart', this.pushGoodToCart);
    },
    mounted() {
        this.makeGetRequest(BaseUrl+Goods);
    },

});


class GoodsItem {
    constructor({product_name: t, price: p, path = "static/images/card/1.jpg"}) {
        this.title = t;
        this.price = p;
        this.path = path;
    }

    render() {
        return `
    <article class="goods-item">
        <div class="cardImg">
            <img src="${this.path}" alt="#">
            <div class="cardImgDark">
                <button>
                    <img src="static/images/header/cart.png" alt="">
                    Add to Cart
                </button>
            </div>
        </div>
        <div class="cardInfo">
            <div class="cardInfoTitle">
                ${this.title}
            </div>
            <div class="cardInfoPrice">
                ${this.price}
            </div>
            <button class="cardBuy">
                ????????????
            </button>
        </div>
    </article>
  `;
    }

}

function makeGetRequest(url) {
    return fetch(url).then((response) => {
        return response.json();
    });
}

class GoodsList {
    BaseUrl = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
    Goods = "/catalogData.json";
    Basket = "/getBasket.json";


    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGetRequest(`${this.BaseUrl}${this.Goods}`).then((value) => {
                this.goods = value;
                resolve();
            });
        })
        /*return new Promise((resolve,reject)=>{
            fetch(`${this.BaseUrl}${this.Goods}`).then((response)=>{
                return response.json();
            }).then((value)=>{
                this.goods=value;
                resolve();
            });
        })*/
    }

    render() {
        let innerHtml = '';
        innerHtml = this.goods.map(item => (new GoodsItem(item)).render());
        document.querySelector('.goods-list').innerHTML = innerHtml.join('');
    }

    getBacketGoods() {
        return new Promise((resolve, reject) => {
            makeGetRequest(`${this.BaseUrl}${this.Basket}`).then((value) => {
                this.basket = value['contents'];
                resolve();
            });
        });
    }

    renderBucket() {
        let innerHtml = '';
        innerHtml = this.basket.map(item => (new GoodsItem(item)).render());
        document.querySelector('.goods-list').innerHTML = innerHtml.join('');
    }

    calculatePrice() {
        return this.goods.reduce((prev, {price}) => {
            return prev + price;
        }, 0);
    }
}

/*const list = new GoodsList();
list.fetchGoods().then(()=>{
    list.render();
    $('#totalPrice').text(list.calculatePrice());
});

list.getBacketGoods().then(()=>{
    list.renderBucket();
})*/
