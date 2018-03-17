import React, { Component } from 'react';
import mySocket from "socket.io-client";

class GameRooms extends Component {
    constructor(props){
        super(props);
        this.state = {
       
        }
        
       
    }
    
    componentDidMount(){
        //console.log(this.refs.thedisplay.id);
       
        }
  
    
    render() {
      
        return (
            <div className="butDiv">
                <button className="roomBut1" onClick={this.props.handleDisplay.bind(this, "room1")}>Room 1 </button>
                <button className="roomBut2" onClick={this.props.handleDisplay.bind(this,"room2")}>Room 2 </button>
            </div>
        )
    }
}

export default GameRooms;
