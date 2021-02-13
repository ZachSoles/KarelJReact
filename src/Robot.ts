class Robot {
    x: number
    y: number
    position: String
    on: Boolean
    // beeperBag: beeper[]
    beeperBag: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.position = "north"
        this.on = true
        this.beeperBag = 3
    }

    move() {
        if(this.position === "north") {
            this.y -= 1
        } else if (this.position === "left") {
            this.x -= 1
        } else if (this.position === "right") {
            this.x += 1
        } else {
            this.y += 1
        }
    }

    // setX(x: number) { this.x = x }

    // setY(y: number) { this.y = y }

    // setPosition(position: String) { this.position = position }

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

    putBeeper(beeperBag: Beeper[]) {
        if (this.beeperBag > 0) {
            var flag = false
            for (var i = 0; i < beeperBag.length; i++) {
                if (beeperBag[i].x === this.x && beeperBag[i].y === this.y) {
                    flag = true
                }
            }
            if (!flag) {
                this.beeperBag -= 1
                beeperBag.push(new Beeper(this.x, this.y))
            }
        }
        return beeperBag
    }

    pickBeeper(beeperBag: Beeper[]) {
        for (var i = 0; i < beeperBag.length; i++) {
            if (beeperBag[i].x === this.x && beeperBag[i].y === this.y) {
                beeperBag.splice(i, 1)
                this.beeperBag += 1
            }
        }
        return beeperBag
    }
}

class Beeper {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}


export{ Robot, Beeper }