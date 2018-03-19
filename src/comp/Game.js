import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";
import GameRooms from "./GameRooms";

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            bgImgsrc:require("../img/garden.png"), 
            beesrc:require("../img/bee.png"), 
            beeclicked:require("../img/cryingbee.png"), 
            audiosrc:require("../img/clicked1.mp3"),
            userScore:0,
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

        this.socket = mySocket("https://bloomgame.herokuapp.com/");
    
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
            
       });
        

       
    }
   
    
    handleImg(){
        alert("Ouch!!")
        this.refs["u"].src = this.state.beeclicked;
        var audioPlay = new Audio(this.state.audiosrc);
        audioPlay.play();
        this.setState({
            userScore:this.state.userScore +1
        });
        
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
        var maxLeft = parseInt(windowW-200+"px");
        var maxTop = parseInt(windowH-200+"px");
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
                <div id="gameContainer">
                        <div>
                           <div id="username">
                                YOUR ID: {this.state.myId}
                            </div>

                            <div>Score: {this.state.userScore} </div>  

                            <div id="highest">Top User & Score
                
                            <button id="endGame">END GAME</button>
                
                            </div> 
                        </div>

                            <img ref={"u"} className="bee" src={this.state.beesrc} onClick= {this.handleImg}  height={100} />
                


                 </div>
        );   
            
            
        }
        
        return (
            <div className="gameApp">
              {comp}
            </div>
        );
    }
}

export default Game;
