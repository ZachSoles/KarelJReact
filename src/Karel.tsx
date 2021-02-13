import React from 'react';
import { Robot, Beeper, Wall } from './Robot';

class Karel extends React.Component <any, any>{
    state = {
        karel : new Robot(20, 20, 3),
        beeperBag: [new Beeper(15, 15)],
        walls: [new Wall(5, 5)],
        height : 30,
        width : 30,
    }

    move = () => {
        var newKarel = this.state.karel
        newKarel.move()
        this.setState({newKarel})
    }

    turnLeft = () => {
        var newKarel = this.state.karel
        newKarel.turnLeft()
        this.setState({newKarel})
    }

    putBeeper = () => {
        var newKarel = this.state.karel
        var newBeeperBag = newKarel.putBeeper(this.state.beeperBag)
        this.setState({newKarel, newBeeperBag})
    }

    pickBeeper = () => {
        var newKarel = this.state.karel
        var newBeeperBag = newKarel.pickBeeper(this.state.beeperBag)
        this.setState({newKarel, newBeeperBag})
    }

    turnOff = () => {
        var newKarel = this.state.karel
        newKarel.turnOff()
        this.setState({newKarel})
    }

    drawGrid() {
        var grid = []
        for (var y = 0; y < this.state.height; y++) {
            for (var x = 0; x < this.state.width; x++) {
                var flag = true
                if (y === this.state.karel.y && x === this.state.karel.x) {
                    grid.push("🥩")
                    continue
                }
                for (var i = 0; i < this.state.beeperBag.length; i++){
                    if (y === this.state.beeperBag[i].y && x === this.state.beeperBag[i].x) {
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

    render() {
        return (
            <div>
                <h1>Karel J Robot</h1>
                <br/>
                {this.drawGrid()}
                <br />
                <button onClick={() => this.turnLeft()}>Turn Left</button>
                <button onClick={() => this.move()}>Move</button>
                <button onClick={() => this.putBeeper()}>Put Beeper</button>
                <button onClick={() => this.pickBeeper()}>Pick Beeper</button>
                <br />
                <br />
            </div>
        );
    }
}

export default Karel;
