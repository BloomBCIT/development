import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";
import GameRooms from "./GameRooms";

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            bgImgsrc:require("../img/garden.png"), beesrc:require("../img/bee.png"), 
            beeclicked:require("../img/cryingbee.png"), 
            allusers:[],
            myId:null,
            showDisplay:false,
            stickers:[]
            
        }
        
        this.handleImg = this.handleImg.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.randomMove = this.randomMove.bind(this);
    }
      
        
    componentDidMount(){
        //console.log(this.refs.thedisplay.id);
        this.socket = mySocket("https://bloomgame.herokuapp.com/");
        
        this.socket.on("createimage", (data)=>{
            this.setState({
                allusers:data
            })
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
            
       }); 

       
       
    }
   
    
    handleImg(){
        this.refs["u"].src = this.state.beeclicked;
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        this.socket.emit("joinroom", roomString);
        
        
    }
    
    
    randomMove() {

        var windowH= window.innerHeight;
        var windowW= window.innerWidth;
        var maxLeft = parseInt(windowW-100+"px");
        var maxTop = parseInt(windowH-100+"px");

        this.refs["u"].style.top = Math.floor(Math.random() * maxTop) + "px";
        this.refs["u"].style.left = Math.floor(Math.random() * maxLeft) + "px";
        

   
    }
    
    render() {
        
        
        var interval = setInterval(this.randomMove, 3000);
            function checkTime(i) {
                if (i < 10) {i = "0" + i}; 
            return i;
        } 
        
        
        var comp = null;
        
        if(this.state.showDisplay ===false){
            comp = <GameRooms 
                handleDisplay={this.handleDisplay}
            />;
            
        }else{
            comp = (
                <div id="container">
                    <img id="bgImg" src={this.state.bgImgsrc} />
                        <div >
                           <div id="username"></div>

                            <p id="scoreText">Score: <span id="scoreNum"> 0</span></p>  

                            <button id="endGame">END GAME</button>

                            <div id="highest"><p> Top User & Score</p><p sid="highestScore"></p>
                            </div> 
                        </div>

                            <img ref={"u"} className="bee" src={this.state.beesrc} onClick= {this.handleImg} height={50} />
                


                 </div>
        );   
            
            
        }
        
        return (
            <div className="App">
              {comp}
            </div>
        );
    }
}

export default Game;
