import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import '../App.css';



class Chat extends Component {
  
    
    constructor(props){
        super(props);
        
        this.state = {
            mode:0,
            username:"",
            users:[],
            allChats:[],
            myMsg:""
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
    
        
    }
    componentDidMount(){
       // this.socket = mySocket("http://localhost:10001");  
       //hi  
        
    }
    
    
    joinChat(){
        this.setState({
            mode:1
        })
        
        this.socket = mySocket("http://bloomchat.herokuapp.com/");
        this.socket.emit("username", this.state.username);
       
        this.socket.on("usersjoined", (data)=>{
            console.log(data);
            this.setState({
                users:data
            })
            
        });
        
        this.socket.on("msgsent", (data)=>{
            this.setState({
                allChats:data
                
            })
        })
    }
    
    handleUsername(evt){
        this.setState({
            username:evt.target.value
        })
    }
    
    
    handleMyMsg(evt){
        this.setState({
            myMsg:evt.target.value
        })
    }
    
    
    sendChat(){
        var msg = this.state.username+":" +this.state.myMsg;
        this.socket.emit("sendChat", msg);
        
        
    }
    
    render() {
        
        var config = null;
        
        if(this.state.mode === 0){
            config= (
            
            
            <div id="configBox">
                <input className="input0" type = "text" placeholder = "Type your username" onChange={this.handleUsername} />
                <button className="joinChat" onClick = {this.joinChat}>Join </button>
            </div>
        
        )
              } else if(this.state.mode === 1){
                  var allChats = this.state.allChats.map((obj,i)=>{
                      return(
                      <div id="allChatsP" key={i}>
                          {obj}
                        </div>
                      
                      )
                  });
                  config = (
                    <div id="chatBox">
                      <div id=  "chatDisplay">{allChats}
                      </div> 
                         <div id ="controls">
                        <input className="input1" onChange={this.handleMyMsg} type="text" placeholder="type your message" />
                        <button className="send"  onClick={this.sendChat}>Send</button>
                      </div>
                    </div>
                  
                  )
                  
              }
        
    var allUsers = this.state.users.map((obj,i)=>{
        return(
            <div id="allUsersP" key={i}>
                {obj}
            </div>
        
        )    
        
    })  
    

    return (
      <div className="wholeChat">
         <button className="xbutton" onClick={this.props.closePopup}>X</button>
        <div className="topBar">
            <p className="bloomP">Bloom Live Chat</p>
        </div>
        <br/><br/><br/>
        
        <div id="allUsers">
            <div id="users">
               <p className="usersP"> USERS </p>
                {allUsers}
            </div>
         </div>
        
         <div className="chatDiv">
            {config}
            </div>
        
         </div>
    );
  }
}

export default Chat;
