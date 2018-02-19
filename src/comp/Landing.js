import React, { Component } from 'react';
import '../App.css';
import {Animated} from "react-animated-css";
import logo from "../img/logo2.png";
import Chat from '../comp/Chat';
import Sticker from '../comp/Sticker';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.state={
            clicked:false,
            StickerClicked:false

        };
        
        this.nextPage = this.nextPage.bind(this);
        this.showingChat = this.showingChat.bind(this);
    }
    
    nextPage(){
        
        var page = "Chat";
        this.props.changePage(page);
    }
 
    showingChat(){
        this.setState({
            clicked: !this.state.clicked
    });
    }
    
    showingSticker(){
        this.setState({
            StickerClicked: !this.state.StickerClicked
    });
    }
    
  render() {
    
      
       var config = null;
      
      
      
      
    return (
        <div className="container">
            <div className="wrap">
            
                <div className="bloomDiv">

                    <img src={logo} alt="Logo" />
                </div>
        
                <div className="kaylie">
                    <Animated animationIn="swing" animationOut="swing" isVisible={true}>
                    
                    
                        <div className="kaylieCircle">
                            <p className="name">KAYLIE SON</p>

                        </div>
                    </Animated>
                    
                   
                </div>

                <div className="sehee">
                    <Animated animationIn="swing" animationOut="swing" isVisible={true}>
                   
                    
                        <div className="seheeCircle">
                            <p className="name">SEHEE AHN</p>
                        </div>
                    </Animated>
                
                   
                </div>
                   
                        {this.state.clicked ?
                            <Chat   
                                    closePopup={this.showingChat.bind(this)}
                                        />
                                        : null
                            }
                            
                             <button className="chatBut" onClick={this.showingChat.bind(this)}>Chat</button>
                             
                        {this.state.StickerClicked ?
                            <Sticker   
                                    closePopup={this.showingSticker.bind(this)}
                                        />
                                        : null
                            }
                            
                             <button className="stickerBut" onClick={this.showingSticker.bind(this)}>Sticker</button>  
   
   
        
                
            </div>
        
        </div>
    );
  }
}
        
        
export default Landing;
