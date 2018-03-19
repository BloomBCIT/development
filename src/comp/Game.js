import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:0,
            username:"",
            bgImgsrc:require("../img/garden.png"), 
            beesrc:require("../img/bee.png"), 
            beeclicked:require("../img/cryingbee.png"), 
            audiosrc:require("../img/clicked1.mp3"),
            userScore:0,
            myId:null,
            showDisplay:false,
            stickers:[],
            ending:false,
            users:[]
            
            
        }
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleImg = this.handleImg.bind(this);
        this.randomMove = this.randomMove.bind(this);
        this.endGame = this.endGame.bind(this);
      
    }
      
        
    joinChat(){
        this.setState({
            mode:1
        })
        this.socket = mySocket("https://bloomgame.herokuapp.com/");
    
        
        this.socket.emit("username", this.state.username);
        
        this.socket.on("usersjoined", (data)=>{
            console.log(data);
            this.setState({
                users:data
            })
            
        });
        

       
    }
   
    
       handleUsername(evt){
        this.setState({
            username:evt.target.value
        })
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
    
    

    
    randomMove() {

        var windowH= window.innerHeight;
        var windowW= window.innerWidth;
        var maxLeft = parseInt(windowW-200+"px");
        var maxTop = parseInt(windowH-200+"px");
        this.refs["u"].style.top = Math.floor(Math.random() * maxTop) + "px";
        this.refs["u"].style.left = Math.floor(Math.random() * maxLeft) + "px";
  
    }

    
    endGame(){
        this.setState({
            ending:true
        });
        
    }
    
    render() {
        
        
        var allUsers = this.state.users.map((obj,i)=>{
        return(
            <div key={i}>
                {obj}
            </div>
        
        )    
        
        })  
    
        
        if(this.state.mode === 1){
            var interval = setInterval(this.randomMove, 3000);
                function checkTime(i) {
                    if (i < 10) {i = "0" + i}; 
                    return i;
                } 
        }
        
        
        if(this.state.ending ===true){          
            clearInterval(interval);
        }
        
        
        
        var comp = null;
        
        if(this.state.mode === 0){
            comp= (
            
            
            <div id="configBox">
                <input className="input0" type = "text" placeholder = "Type your username" onChange={this.handleUsername} />
                <button className="joinChat" onClick = {this.joinChat}>Join </button>
            </div>
        
        )
        } else if(this.state.mode === 1){
            comp = (
                <div id="gameContainer">
                        <div>                 
                           <div id="username">
                                YOUR NAME: {this.state.username}
                                
                            </div>
                            <div>ALL USERS:{allUsers}</div>

                            <div>Score: {this.state.userScore} </div>  

                
                            <button onClick={this.endGame} id="endGame">END GAME</button>
                
                         
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
