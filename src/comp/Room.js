import React, { Component } from 'react';
import mySocket from "socket.io-client";

class Room extends Component {
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
            <div>
                <button onClick={this.props.handleDisplay.bind(this, "room1")}>Room 1 </button>
                <button onClick={this.props.handleDisplay.bind(this,"room2")}>Room 2 </button>
            </div>
        )
    }
}

export default Room;
