var animalPopulation = 0;
var allAnimals = [];


$(document).ready(function(){
    run();
});


function run(){
    var tigger = new Tiger("Tigger");
    var pooh = new Bear("Pooh");
    var rarity = new Unicorn("Rarity");
    var gemma = new Giraffe("Gemma");
    var stinger = new Bee("Stinger");

    allAnimals = [tigger, pooh, rarity, gemma, stinger];
    console.log(allAnimals);
    listAnimals();
    console.log(Animal.getPopulation());
}


$(document).ready(function(){
    $("#create").click(function(){
        createAnimal($("#nameField").val());
    });
    $("#feed").click(function(){
        deleteAnimal($("#delete").val());
    });
});


function createAnimal(){
    var newAnimal;
    var x = $("#selectAnimal").val();
    var name = $("#nameField").val();
    switch (parseInt(x)){
        case 1:
            newAnimal = new Tiger(name);
            break;
        case 2:
            newAnimal = new Bear(name);
            break;
        case 3:
            newAnimal = new Unicorn(name);
            break;
        case 4:
            newAnimal = new Giraffe(name);
            break;
        case 5:
            newAnimal = new Bee(name);
            break;
    }
    allAnimals.push(newAnimal);
    listAnimals();
    $("#actions").html("<div>" + name + " the " + newAnimal.constructor.name + " was created</div>")
}


function feedAnimals(){
    var food = $("#feed").val();
    $("#actions").html("");
    for(var i = 0; i < allAnimals.length; i++){
        allAnimals[i].eat(food);
    }
    console.log(food);
}


function listAnimals(){
    $("#printer").empty();
    for(var i = 0; i < allAnimals.length; i++){
        if(i != allAnimals.length - 1){
            $("#printer").append(allAnimals[i].name + " the " + allAnimals[i].constructor.name + ", ");
        }else{
            $("#printer").append(allAnimals[i].name + " the " + allAnimals[i].constructor.name + "<br>");
        }
    }
}


function deleteAnimal(){
    var name = $("#delete").val();
    for(var i = 0; i < allAnimals.length; i++){
        if(allAnimals[i].name === name){
            $("#actions").html("<div>" + name + " the " + allAnimals[i].constructor.name + " was deleted</div>");
            allAnimals.splice(i, 1);
        }
    }
    $("." + name).hide();
    listAnimals();
}


function changeName(){
    var first = $("#first").val();
    var second = $("#second").val();
    for(var i = 0; i < allAnimals.length; i++){
        if(first === allAnimals[i].name){
            allAnimals[i].name = second;
            $("#" + first).html("<div>" + second + " the " + allAnimals[i].constructor.name + "</div>");
        }
    }
    listAnimals();
    $("#actions").html("<div>" + first + "'s name is now " + second);
}


class Zookeeper {
    constructor(name){
        this.name = name;
    }

    feedAnimals(animals, food){
        document.getElementById("actions").innerHTML = this.name + " is feeding " + food + " to " + animals.length + " of " + Animal.getPopulation() + " animals";
        for(var i = 0; i < animals.length; i++){
            animals[i].eat(food);
        }
    }
}


class Animal {
    constructor(name, favoriteFood){
        this.name = name;
        this.favoriteFood = favoriteFood;
        animalPopulation ++;
    }

    static getPopulation(){
        return animalPopulation;
    }
    sleep(){
        document.getElementById("actions").innerHTML += this.name + " sleeps for 8 hours<br>";
    }

    eat(food){
        document.getElementById("actions").innerHTML += this.name + " eats " + food + "<br>";
        var favorite = (food === this.favoriteFood) ? document.getElementById("actions").innerHTML += "YUM!!! " + this.name + " wants more " + food + "<br>" : this.sleep() + "<br>";
    }
}


class Tiger extends Animal{
    constructor(name){
        super(name, "Meat");
    }
}


class Bear extends Animal{
    constructor(name){
        super(name, "Fish");
    }

    sleep() {
        document.getElementById("actions").innerHTML += this.name + " hibernates for 4 months<br>";
    }
}


class Unicorn extends Animal{
    constructor(name){
        super(name, "Marshmallows");
    }

    sleep(){
        document.getElementById("actions").innerHTML += this.name + " sleeps in a cloud" + "<br>";
    }
}


class Giraffe extends Animal{
    constructor(name){
        super(name, "Leaves")
    }

    eat(food){
        var leaves = (food === this.favoriteFood) ? super.eat("leaves") : document.getElementById("actions").innerHTML += "YUCK!!! " + this.name + " will not eat " + food + "<br>";
    }
}


class Bee extends Animal{
    constructor(name){
        super(name, "Pollen");
    }

    eat(food){
        var pollen = (food === this.favoriteFood) ? super.eat("pollen") : document.getElementById("actions").innerHTML += "YUCK!!! " + this.name + " will not eat " + food + "<br>";
    }

    sleep(){
        document.getElementById("actions").innerHTML += this.name + "never sleeps" + "<br>";
    }
}