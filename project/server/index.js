const express = require('express');
const cors = require('cors');
const {writeFile, readFile} = require('fs/promises');

const BASKET_GOODS = "./static/basket-good.json"
const GOODS = "./static/goods.json"

function getRawBasketGoods() {
    return readFile(BASKET_GOODS, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}
function getGoods() {
    return readFile(GOODS, 'utf-8').then((text) => {
        return JSON.parse(text);
    });
}

function getBasketGoods(){
    return Promise.all([getGoods(), getRawBasketGoods()]).then(([goods, rawBasketGoods])=>{
       return rawBasketGoods.map((rawBasketGood)=>{
           const {id, count} = rawBasketGood;
           const good = goods.find(({id:goodId})=>{
               return goodId === id;
           });
           console.log(rawBasketGood, good);
           return{
               ...rawBasketGood,
               data:good,
               total: count*good.price
           }
       });
    });
}

function addBasketGoods(goodId){
    return getRawBasketGoods().then((basketGoods)=>{
       if(basketGoods.find(({id})=>{return id === goodId})){
           const result = basketGoods.map((basketGood)=>{
               if(basketGood.id == goodId){
                   return{
                       ...basketGood,
                       count: basketGood.count + 1
                   }
               }else {
                    return basketGood;
               }
           });
           return result;
       }else{
           return [
               ...basketGoods,
               {
                   id: goodId,
                   count: 1
               }
           ];
       }
    }).then((result)=>{
        return writeFile(BASKET_GOODS, JSON.stringify(result)).then(()=>{
            return result;
        })
    });
}

function deleteBasketGoods(goodId){
    return getRawBasketGoods().then((basketGoods)=>{
        if(basketGoods.find(({id})=>{return id === goodId})){
            const result = basketGoods.map((basketGood)=>{
                if(basketGood.id == goodId){
                    if(basketGood.count>1){
                        return{
                            ...basketGood,
                            count: basketGood.count - 1
                        }
                    }
                }else {
                    return basketGood;
                }
            });
            return result;
        }
    }).then((result)=> {
        return writeFile(BASKET_GOODS, JSON.stringify(result)).then(() => {
            return result;
        });
    });
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/static'));

app.get('/', (req, res)=>{
   res.sendFile(__dirname+'/index.html');
});

app.get('/basket-good', (req, res)=>{
    getBasketGoods().then((data)=>{
       res.send(data);
    });
});

app.put('/basket-good', (req,res)=>{
    addBasketGoods(req.body.id).then((basketGoods)=>{
        res.send(JSON.stringify(basketGoods));
    });
});

app.delete('/basket-good', (req, res)=>{
    deleteBasketGoods(req.body.id).then((basketGoods)=>{
       res.send(JSON.stringify(basketGoods));
    });
})

app.listen('8000', ()=>{
    console.log('server is starting');
});

