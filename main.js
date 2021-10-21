Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
};
class Plate {
    #platenumber;
    #exp;
    constructor() {
        this.#exp = /^[A-Z]{3}[-]{1}[0-9]{4}/;
    }

    set platenumber(value) {
        this.#platenumber = value;
    }

    get platenumber() {
        return this.#platenumber;
    }

    validate() {
        return this.#exp.test(this.#platenumber.toUpperCase());
    }
};
class Predictor {
    #plate;
    #date;
    #time;
    #rest_days = [[], [0, 1, 2, 3], [2, 3, 4, 5], [4, 5, 6, 7], [6, 7, 8, 9], [0, 1, 8, 9], []];
    #rest_hours = [700, 1900];
    #timeexp = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

    constructor() {
        this.#plate = new Plate();

    }

    validate_date() {
        this.#date = new Date(this.#date);
        return this.#date.isValid();
    }
    validate_time() {
        return this.#timeexp.test(this.#time);
    }

    dayofweek() {
        return this.#date.getDay();
    }
    intime() {
        this.#time = parseInt(this.#time.replace(':', ''));
        return (this.#time < this.#rest_hours[0]) || this.#time > this.#rest_hours[1];
    }

    onRoad(platenumber, date, time) {
        //validate plate
        this.#plate.platenumber = platenumber;
        if (!this.#plate.validate()) return 'Error: invalid plate number.';
        //validate date    
        this.#date = date;
        if (!this.validate_date()) return 'Error: invalid date.';
        //validate time   
        this.#time = time;
        if (!this.validate_time()) return 'Error: invalid time.';
        if (this.intime()) return 'car can be on road';
        var last_digit = parseInt(this.#plate.platenumber[7]);
        if (!this.#rest_days[this.dayofweek()].includes(last_digit)) {
            console.log('dow-', this.dayofweek(), this.#rest_days[this.dayofweek()], this.#rest_days[this.dayofweek()].includes(last_digit));
            return 'car can be on road';
        } else return 'car can not be on road';
    }

}