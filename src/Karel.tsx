import React from 'react';
import { Robot } from './Robot';

class Karel extends React.Component <any, any>{
    state = {
        karel : new Robot(20,20),
        beepers: [{x: 15, y: 15}],
        height : 30,
        score: 0,
        width : 30,
        grid: [],
        // food: {x : 10, y: 10},
        gameOver: false
    }

    move = () => {
        var newKarel = this.state.karel
        var newX = this.state.karel.x
        var newY = this.state.karel.y
        console.log(this.state.karel.position)
        if(this.state.karel.position === "north") {
            newY -= 1
        } else if (this.state.karel.position === "left") {
            newX -= 1
        } else if (this.state.karel.position === "right") {
            newX += 1
        } else {
            newY += 1
        }
        newKarel.setX(newX)
        newKarel.setY(newY)
        this.setState({karel: newKarel})
    }

    turnLeft = () => {
        var newKarel = this.state.karel
        newKarel.turnLeft()
        this.setState({karel: newKarel})
    }

    // putBeeper = () => {
    //     var beepers = this.state.beepers
    //     var isBeeper = false
    //     for(var idx = 0; idx < beepers.length; idx++) {
    //         if(beepers[idx].x === this.state.karel.x && beepers[idx].y === this.state.karel.y) {
    //             isBeeper = true
    //         }
    //     }
    //     if(!isBeeper) {
    //         beepers.push({x: this.state.karel.x, y: this.state.karel.y})
    //         this.setState({beepers: beepers})
    //     }
    // }

    // pickBeeper = () => {
    //     var beepers = this.state.beepers
    //     for(var idx = 0; idx < beepers.length; idx++) {
    //         if(beepers[idx].x === this.state.karel.x && beepers[idx].y === this.state.karel.y) {
    //             beepers.splice(idx, 1)
    //         }
    //     }
    //     this.setState({beepers: beepers})
    // }

    drawGrid(){
        var grid = []
        for (var y = 0; y < this.state.height; y++) {
            for (var x = 0; x < this.state.width; x++) {
                var flag = true
                if (y === this.state.karel.y && x === this.state.karel.x) {
                    grid.push("🥩")
                    continue
                }
                for (var i = 0; i < this.state.karel.beeperBag.length; i++){
                    if (y === this.state.karel.beeperBag[i].y && x === this.state.karel.beeperBag[i].x) {
                        grid.push("⚫️")
                        flag = false
                    }
                }
                if (flag)  { grid.push("⬜️") }
            }
            grid.push(<br/>)
        }
        return grid
    }

    turnOff = () => {
        var newKarel = this.state.karel
        newKarel.turnOff()
        this.setState({karel: newKarel})
    }

    render() {
        return (
            <div>
                <h1>Karel J Robot</h1>
                <br/>
                {/* <h1>{this.state.score}</h1> */}
                {this.drawGrid()}

                <br />
                {/* <button onClick={this.newGame}>New Game</button> */}
                <button onClick={() => this.turnLeft()}>Turn Left</button>
                <button onClick={() => this.move()}>Move</button>
                {/* <button onClick={() => this.move("down")}>🔽</button>
                <button onClick={() => this.move("right")}>▶️</button> */}
                {/* <button onClick={this.gameOver}>End Game</button> */}
                <br />
                <br />
            </div>
        );
    }
}

export default Karel;
