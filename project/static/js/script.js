let BaseUrl = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
let Goods = "/catalogData.json";
let Basket = "/getBasket.json"


const app = new Vue({
    el: "#app",
    data: {
        name: '',
        goods: [],
        filterGoods:[],
        cartGoods:[],
        searchLine:'searchLine',
        cartIsVisible: false,
        totalPrice:0,
    },
    methods: {
        makeGetRequest(url){
            return fetch(url).then((response)=>{
                return response.json();
            });
        },
        cartIconClick(event){
            if(this.cartIsVisible){
                this.cartIsVisible = false;
            }else{
                this.cartIsVisible = true;
            }
        },
        calculatePrice(){
            if(this.cartIsVisible){
                this.totalPrice = this.cartGoods.reduce((prev,{price})=>{
                    return prev+price;
                },0);
            }else {
                this.totalPrice = this.goods.reduce((prev,{price})=>{
                    return prev+price;
                },0);
            }
            return this.totalPrice;
        },
        pushGoodToCart(product_name, event){
            for(let i=0;i<this.goods.length;i++){
                if(this.goods[i].product_name == product_name){
                    this.cartGoods.push(this.goods[i]);
                    return
                }
            }
        },
    },
    mounted(){
        this.makeGetRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json').then((value)=>{
            this.goods = value;
            this.calculatePrice();
        })
    },


});



















class GoodsItem{
    constructor({product_name:t, price:p, path="static/images/card/1.jpg"}) {
        this.title = t;
        this.price = p;
        this.path = path;
    }

    render(){
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
                Купить
            </button>
        </div>
    </article>
  `;
    }

}

function makeGetRequest(url){
    return fetch(url).then((response)=>{
        return response.json();
    });
}


class GoodsList{
    BaseUrl = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
    Goods = "/catalogData.json";
    Basket = "/getBasket.json";


    fetchGoods(){
        return new Promise((resolve,reject)=>{
            makeGetRequest(`${this.BaseUrl}${this.Goods}`).then((value)=>{
                this.goods=value;
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
    render(){
        let innerHtml = '';
        innerHtml = this.goods.map(item => (new GoodsItem(item)).render());
        document.querySelector('.goods-list').innerHTML = innerHtml.join('');
    }

    getBacketGoods(){
        return new Promise((resolve,reject)=>{
            makeGetRequest(`${this.BaseUrl}${this.Basket}`).then((value)=>{
                console.log(value);
                this.basket=value['contents'];
                resolve();
            });
        });
    }

    renderBucket(){
        let innerHtml = '';
        innerHtml = this.basket.map(item => (new GoodsItem(item)).render());
        document.querySelector('.goods-list').innerHTML = innerHtml.join('');
    }

    calculatePrice(){
        return this.goods.reduce((prev,{price})=>{
            return prev+price;
        },0);
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
