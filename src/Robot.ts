class Robot {
    x: number
    y: number
    position: Direction
    on: Boolean
    beeperBag: number

    constructor(x: number, y: number, beeperBag: number) {
        this.x = x
        this.y = y
        this.position = Direction.north
        this.on = true
        this.beeperBag = beeperBag
    }

    private wallInWay(walls: Wall[]) {
        var wallInWay = false
        for (var i = 0; i < walls.length; i++) {
            if(this.position === Direction.north) {
                if(this.y - 1 === walls[i].y && this.x == walls[i].x) {
                    wallInWay = true
                }
            } else if(this.position === Direction.west) {
                if(this.x - 1 === walls[i].x  && this.y == walls[i].y) {
                    wallInWay = true
                }
            } else if(this.position === Direction.east) {
                if(this.x + 1 === walls[i].x  && this.y == walls[i].y) {
                    wallInWay = true
                }
            } else {
                if(this.y + 1 === walls[i].y  && this.x == walls[i].x) {
                    wallInWay = true
                }
            }
        }
        return wallInWay
    }

    move(walls: Wall[]) {
        if (!this.wallInWay(walls)) {
            if(this.position === Direction.north) {
                this.y -= 1
            } else if (this.position === Direction.west) {
                this.x -= 1
            } else if (this.position === Direction.east) {
                this.x += 1
            } else {
                this.y += 1
            }
        }
    }

    turnLeft() {
        if (this.position === Direction.north) {
            this.position = Direction.west
        } else if (this.position === Direction.west) {
            this.position = Direction.south
        } else if (this.position === Direction.south) {
            this.position = Direction.east
        } else {
            this.position = Direction.north
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

enum Direction {
    north = "north",
    west = "west",
    east = "east",
    south = "south"
}

class Beeper {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Wall {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}


export{ Robot, Beeper, Wall }