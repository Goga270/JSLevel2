const goods = [
    { title: 'Shirt', price: 150, path: "static/images/card/1.jpg"},
    { title: 'Socks', price: 50, path: "static/images/card/1.jpg" },
    { title: 'Jacket', price: 350, path: "static/images/card/1.jpg" },
    { title: 'Shoes', price: 250, path: "static/images/card/1.jpg" },
    { title: 'Shoes', price: 250, path: "static/images/card/1.jpg" },
    { title: 'Shoes', price: 250, path: "static/images/card/1.jpg" }
];

class GoodsItem{
    constructor({title:t, price:p, path}) {
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

class GoodsList{
    fetchGoods(){
       this.goods = goods;
    }
    render(){
        let innerHtml = '';
        innerHtml = this.goods.map(item => (new GoodsItem(item)).render());
        document.querySelector('.goods-list').innerHTML = innerHtml.join('');
    }

    calculatePrice(){
        let totalPrice = 0;
        if(this.goods.length>0){
            for(let i =0;i<goods.length;i++){
                totalPrice += goods[i].price;
            }
        }
        return totalPrice;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
$('#totalPrice').text(list.calculatePrice());
