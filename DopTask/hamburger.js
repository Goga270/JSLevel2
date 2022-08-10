$('#burgerSubmit').on('click', function (e){
    e.preventDefault();
    let burger = {};
    const sizes = $('.size');
    if(sizes[0].checked){
        burger =  new SmallHumburger($('#name').val(), "small");
    }else {
        burger =  new BigHumburger($('#name').val(), "small");
    }

    const stuffingCheckboxes = $('.stuffing');
    let stuffing =[];
    for(let i=0;i<stuffingCheckboxes.length;i++){
        if(stuffingCheckboxes[i].checked){
            stuffing.push(new Stuffing($(stuffingCheckboxes[i]).attr('id')));
        }
    }

    const toppingCheckboxes = $('.topping');
    let topping =[];
    for(let i =0; i<toppingCheckboxes.length;i++){
        if(toppingCheckboxes[i].checked){
            topping.push(new Topping($(toppingCheckboxes[i]).attr('id')));
        }
    }

    let randomNumber = Math.floor(Math.random()*4+1);

    burger.stuffing = stuffing;
    burger.topping = topping;
    $('#burgerName').text(burger.name);
    $('#burgerPrice').text(burger.calculatePrice());
    $('#burgerCal').text(burger.calculateCal());

    $('.burgerInfo').css('display', 'flex');
    $('.burgerImg').attr('src', 'images/'+randomNumber+'.png');
    $('.Img').css('display', 'flex');
});

class Base{
    name = "";
    price = 0;
    call = 0;

    sayHrum(){
        console.log("Hrum");
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get price() {
        return this.price;
    }

    set price(value) {
        this.price = value;
    }

    get call() {
        return this.call;
    }

    set call(value) {
        this.call = value;
    }
}

class Stuffing extends Base{
    constructor(name) {
        super();
        switch (name){
            case "cheese":
                this.name = name;
                this.price = 10;
                this.call = 20;
                break;
            case "salad":
                this.name = name;
                this.price = 20;
                this.call = 5;
                break;
            case "potato":
                this.name = name;
                this.price = 15;
                this.call = 10;
                break;
        }
    }
}

class Topping extends Base{
    constructor(name) {
        super();
        switch (name){
            case "specie":
                this.name = name;
                this.price = 15;
                this.call = 0;
                break;
            case "maionez":
                this.name = name;
                this.price = 20;
                this.call = 5;
                break;
        }
    }
}

class Humburger extends Base {
    size = "";
    topping = [];
    stuffing =  [];
    constructor(name, size) {
        super();
        this.name = name;
        this.size = size;
    }
    sayHrum(){
        console.log("Hrum humburger");
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get size() {
        return this.size;
    }

    set size(value) {
        this.size = value;
    }

    get stuffing() {
        return this.stuffing;
    }

    set stuffing(value) {
        this.stuffing = value;
    }

    get topping() {
        return this.topping;
    }

    set topping(value) {
        this.topping = value;
    }

    calculatePrice(){
        let price = this.price;
        if(this.topping.length>0){
            for(let i=0;i<this.topping.length;i++){
                price+= this.topping[i].price;
            }
        }
        if(this.stuffing.length>0){
            for(let i=0;i<this.stuffing.length;i++){
                price += this.stuffing[i].price;
            }
        }
        return price;
    }
    calculateCal(){
        let calorii = this.call;
        if(this.stuffing.length>0){
            for(let i=0;i<this.stuffing.length;i++){
                calorii += this.stuffing[i].call;
            }
        }
        if(this.topping.length>0){
            for(let i=0;i<this.topping.length;i++){
                calorii+= this.topping[i].call;
            }
        }
        return calorii;
    }

}

class BigHumburger extends Humburger{
    price = 100;
    call = 40;

    sayHrum(){
        console.log("Hrum BigHumburger");
    }
}

class SmallHumburger extends Humburger{
    price = 50;
    call = 20;

    sayHrum(){
        console.log("Hrum smallHumburger");
    }
}


