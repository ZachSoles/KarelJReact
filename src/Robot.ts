class Robot {
    x: number
    y: number
    position: String
    on: Boolean
    beeperBag: beeper[]

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.position = "north"
        this.on = true
        this.beeperBag = [new beeper(10, 10)]
    }

    move() { this.x += 1 }

    setX(x: number) { this.x = x }

    setY(y: number) { this.y = y }

    setPosition(position: String) { this.position = position }

    turnLeft() {
        if (this.position === "north") {
            this.position = "left"
        } else if (this.position === "left") {
            this.position = "south"
        } else if (this.position === "south") {
            this.position = "right"
        } else {
            this.position = "north"
        }
    }

    turnOff() { this.on = false }

    putBeeper() {
        if (this.beeperBag.length > 0) {
            this.beeperBag.push(new beeper(this.x, this.y))
        }
    }

    pickBeeper() {

    }
}

class beeper {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}


export{ Robot }