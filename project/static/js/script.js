const goods = [
    { title: 'Shirt', price: 150, description: "flkkfklfjkfd dd dd ddddddd d ddfggd  wdfd d ggdgd ", path: "static/images/card/1.jpg"},
    { title: 'Socks', price: 50, description: "flkkfklfjkfdjk", path: "static/images/card/1.jpg" },
    { title: 'Jacket', price: 350, description: "flkkfklfjkfdjk", path: "static/images/card/1.jpg" },
    { title: 'Shoes', price: 250, description: "flkkfklfjkfdjk", path: "static/images/card/1.jpg" },
];

const renderGoodsItem = (title, price, description, path) => {
    return `
    <article class="goods-item">
        <div class="cardImg">
            <img src="${path}" alt="#">
            <div class="cardImgDark">
                <button>
                    <img src="static/images/header/cart.png" alt="">
                    Add to Cart
                </button>
            </div>
        </div>
        <div class="cardInfo">
            <div class="cardInfoTitle">
                ${title}
            </div>
            <div class="cardInfoDescription">
                ${description}
            </div>
            <div class="cardInfoPrice">
                ${price}
            </div>
            <button class="cardBuy">
                Купить
            </button>
        </div>
    </article>
  `;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.description, item.path));
    goodsList = goodsList.join('');
    console.log(goodsList);
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);