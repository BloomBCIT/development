import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";
import Room from "./Room";

class Sticker extends Component {
    constructor(props){
        super(props);
        this.state = {
            myImg:require("../img/st1.png"),
            myImg2:require("../img/st2.png"),
            allusers:[],
            myId:null,
            showDisplay:false,
            stickers:[]
            
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
    }
      
        
    componentDidMount(){
        //console.log(this.refs.thedisplay.id);
        this.socket = mySocket("https://bloombcit-sticker.herokuapp.com/");
        
        this.socket.on("createimage", (data)=>{
            this.setState({
                allusers:data
            })
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
        
        this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            //console.log("moving", ev.pageX, ev.pageY);
            //this.refs.myImg.style.left = ev.pageX+"px";
            //this.refs.myImg.style.top = ev.pageY+"px";
            if(this.state.myId === null){
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myId,
                src:this.refs["u"+this.state.myId].src
            });
        });
            
            this.refs.thedisplay.addEventListener("click", (ev)=>{
                this.socket.emit("sticker", {
                    x:ev.pageX,
                    y:ev.pageY,
                    //id:this.state.myId,
                    src:this.refs["u"+this.state.myId].src
            });
                })
                
            
       }); 

        this.socket.on("newsticker", (data)=>{
            this.setState({
                stickers:data
            })
            
        })
        
        this.socket.on("usermove", (data)=>{
            console.log("user has moved");
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].src = data.src;
        })
        /*
        this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            //console.log("moving", ev.pageX, ev.pageY);
            //this.refs.myImg.style.left = ev.pageX+"px";
            //this.refs.myImg.style.top = ev.pageY+"px";
            if(this.state.myId === null){
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myId,
                img:this.refs["u"+this.state.myId].src
            });
        });
         */
    }
   
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        this.socket.emit("joinroom", roomString);
        
        
    }
    
    render() {
        var auImgs = this.state.allusers.map((obj,i)=>{
            return (
                <img ref={"u"+obj}className="allImgs" src={this.state.myImg} height={50} key={i} />
            )
        });
        
        var stickers = this.state.stickers.map((obj,i)=>{
            
            var mstyle = {left:obj.x, top:obj.y}
            
            return(
                <img style={mstyle} src={obj.src} key={i} height={50} className="allImgs"/>
            
            )
            
        })
        
        
        var comp = null;
        
        if(this.state.showDisplay ===false){
            comp = <Room 
                handleDisplay={this.handleDisplay}
            />;
            
        }else{
            comp = (
                <div>
                    <div ref="thedisplay" id="display2">
                        {auImgs}
                        {stickers}
                    </div>
                        <div id="controls3">
                            {this.state.myId}
                            <img src={this.state.myImg} height={50} onClick={this.handleImage} />
                            <img src={this.state.myImg2} height={50} onClick={this.handleImage} />
                        </div>
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

export default Sticker;
