import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { Robot } from '../Shared/Robot';
import { Wall } from '../Shared/Wall';
import { Beeper } from '../Shared/Beeper';
import './Editor.css';
import { gridType } from '../Shared/Types';

class Editor extends React.Component <any, any>{
    state = {
        karels : [new Robot(1, 1, 0)],
        beeperBag: [new Beeper(6, 6)],
        walls: [new Wall(7, 7)],
        height : 10,
        width : 10
    }

    handleButtonKarel = (x: number, y: number, type: gridType) => {
        console.log(x, y)
        var newKarels = this.state.karels
        var newBeeperBag = this.state.beeperBag
        var newWalls = this.state.walls
        if(type === gridType.karel) {
            newBeeperBag.push(new Beeper(x, y))
            for(var i = 0; i < newKarels.length; i++) {
                if(newKarels[i].x === x && newKarels[i].y === y) {
                    newKarels.splice(i, 1)
                }
            }
            this.setState({newKarels, newBeeperBag})
        } else if(type === gridType.beeper) {
            for(var i = 0; i < newBeeperBag.length; i++) {
                if(newBeeperBag[i].x === x && newBeeperBag[i].y === y) {
                    newBeeperBag.splice(i, 1)
                }
            }
            newWalls.push(new Wall(x, y))
            this.setState({beeperBag: newBeeperBag, walls: newWalls})
        } else if(type === gridType.wall) {
            console.log(x, y)
            for(var i = 0; i < newWalls.length; i++) {
                if(newWalls[i].x === x && newWalls[i].y === y) {
                    newWalls.splice(i, 1)
                }
            }
            this.setState({walls: newWalls, newKarels})
        } else {
            newKarels.push(new Robot(x,y,0))
            this.setState({newKarels})
        }
    }

    gridButton(x: number, y: number, type: gridType) {
        return (
            <Button
                className='buttonStyle'
                onClick={() => {this.handleButtonKarel(x, y, type)}}
                variant="outlined">
                    <span className='textStyle'>{type}</span>
            </Button>
        )
    }

    drawGrid() {
        var grid: any[] = []
        var heightArr: number[] = []
        var widthArr: number[] = []

        for(var i = 0; i < this.state.height; i++) {
            heightArr[i] = i
        }
        for(var i = 0; i < this.state.width; i++) {
            widthArr[i] = i
        }

        heightArr.forEach(x => {
            widthArr.forEach(y => {
                var flag = true
                for (var i = 0; i < this.state.karels.length; i++){
                    if (y === this.state.karels[i].y && x === this.state.karels[i].x) {
                        grid.push(this.gridButton(x, y, gridType.karel))
                        flag = false
                    }
                }
                for (var i = 0; i < this.state.walls.length; i++){
                    if (y === this.state.walls[i].y && x === this.state.walls[i].x) {
                        grid.push(this.gridButton(x, y, gridType.wall))
                        flag = false
                    }
                }
                for (var i = 0; i < this.state.beeperBag.length; i++){
                    if (y === this.state.beeperBag[i].y && x === this.state.beeperBag[i].x) {
                        grid.push(this.gridButton(x, y, gridType.beeper))
                        flag = false
                    }
                }
                if (flag)  {
                    grid.push(this.gridButton(x, y, gridType.empty))
                }
            })
            grid.push(<br/>)
        })

        // for (var y = 0; y < this.state.height; y++) {
        //     for (var x = 0; x < this.state.width; x++) {
        //         var flag = true
        //         if (y === this.state.karel.y && x === this.state.karel.x) {
        //             var newX = x
        //             var newY = y
        //             // grid.push("🥩")
        //             grid.push(
        //                 <Button
        //                     className='buttonStyle'
        //                     // onClick={() => {this.handleButtonKarel(x, y, gridType.karel)}}
        //                     variant="outlined">
        //                         <span className='textStyle'>{gridType.karel}</span>
        //                 </Button>
        //             )
        //             continue
        //         }
        //         for (var i = 0; i < this.state.walls.length; i++){
        //             if (y === this.state.walls[i].y && x === this.state.walls[i].x) {
        //                 var newX = this.state.walls[i].x
        //                 var newY = this.state.walls[i].y
        //                 grid.push(<Button className='buttonStyle' onClick={() => {this.handleButtonKarel(newX, newY, gridType.wall)}} variant="outlined"><span className='textStyle'>{gridType.wall}</span></Button>)
        //                 flag = false
        //             }
        //         }
        //         for (var i = 0; i < this.state.beeperBag.length; i++){
        //             if (y === this.state.beeperBag[i].y && x === this.state.beeperBag[i].x) {
        //                 var newX = this.state.beeperBag[i].x
        //                 var newY = this.state.beeperBag[i].y
        //                 grid.push(<Button className='buttonStyle' onClick={() => {this.handleButtonKarel(newX, newY, gridType.beeper)}} variant="outlined"><span className='textStyle'>{gridType.beeper}</span></Button>)
        //                 flag = false
        //             }
        //         }
        //         if (flag)  {
        //             var newX = x
        //             var newY = y
        //             grid.push(<Button className='buttonStyle' onClick={() => {this.handleButtonKarel(x, y, gridType.empty)}} variant="outlined"><span className='textStyle'>{gridType.empty}</span></Button>)
        //         }
        //     }
        //     grid.push(<br/>)
        // }
        return grid
    }

    handleInputHeight = (event: { target: { value: any; }; }) => {
        this.setState({height: event.target.value})
    }

    handleInputWidth = (event: { target: { value: any; }; }) => {
        this.setState({width: event.target.value})
    }

    render() {
        return (
            <div>
                <h1>Karel J Robot</h1>
                <br/>
                {this.drawGrid()}
                <br/>
                <form>
                    <TextField onChange={this.handleInputHeight} id="standard-basic" label={this.state.height}/>
                    <TextField onChange={this.handleInputWidth} id="standard-basic" label={this.state.width}/>
                </form>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Editor;
