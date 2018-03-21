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
        this.handleImg2 = this.handleImg2.bind(this);
        this.randomMove = this.randomMove.bind(this);
        this.endGame = this.endGame.bind(this);
      
    }
    
    componentDidMount(){
        this.socket = mySocket("https://bloomgame.herokuapp.com/");

        this.socket.on("result", (data)=>{
            alert(data);
        });
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
        
        this.interval = setInterval(this.randomMove, 3000);

       
    }
   
    
       handleUsername(evt){
        this.setState({
            username:evt.target.value
        })
    }
    
    
    handleImg(){
        this.refs["u"].src = this.state.beeclicked;
        var audioPlay = new Audio(this.state.audiosrc);
        audioPlay.play();
        this.setState({
            userScore:this.state.userScore +1
        });
        
    }
    
    handleImg2(){
        this.refs["u"].src = this.state.beesrc;
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
        
        var obj ={
            username:this.state.username,
            score:this.state.userScore
        }

        this.socket.emit("submitscore", data); 
        alert(this.state.username+ ", your score is: "+this.state.userScore);
    }
    
    render() {
        
        
        var allUsers = this.state.users.map((obj,i)=>{
        return(
            <div key={i}>
                {obj}
            </div>
        
        )    
        
        })  
        
        var interval;
        
        /*if(this.state.mode === 1){
            
                function checkTime(i) {
                    if (i < 10) {i = "0" + i}; 
                    return i;
                } 
        }*/
        
        if(this.state.ending === true){
           clearInterval(this.interval) 
           
        }
        
        
        
        var comp = null;
        
        if(this.state.mode === 0){
            comp= (
            
            
            <div ref={"c"} id="configBox">
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

                            <img ref={"u"} className="bee" src={this.state.beesrc} onMouseDown= {this.handleImg} onMouseUp={this.handleImg2} height={100} />
                


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
