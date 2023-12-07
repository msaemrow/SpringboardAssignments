class Vehicle{
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep";
    }

    toString(){
        return `This vehicle is a ${this.make} ${this.model} from ${this.year}`
    }
}

class Car extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWHeels = 4;
    }
}

class Motorcycle extends Vehicle{
    constructor(make, model, year){
        super(make, model, year);
        this.numWHeels = 2;
    }

    revEngine(){
        return "VROOM!!!";
    }
}

class Garage{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = [];
    }

    add(newVehicle){
        if(this.capacity === 0){
            return "Sorry, we're full."
        } else if(typeof newVehicle !== "object"){
            return "Sorry, only vehicles are allowed in here!"
        } 
        this.vehicles.push(newVehicle);
        this.capacity --;
        return "Vehicle added!"
    }
}