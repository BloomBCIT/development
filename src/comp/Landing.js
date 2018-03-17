import React, { Component } from 'react';
import '../App.css';
import {Animated} from "react-animated-css";
import logo from "../img/logo2.png";
import Chat from '../comp/Chat';
import Sticker from '../comp/Sticker';
import Quiz from '../comp/Quiz';
import Team from '../comp/Team';

class Landing extends Component {
    constructor(props){
        super(props);
        
        this.state={
            clicked:false,
            StickerClicked:false,
            quizClicked:false,
            teamClicked:false,

        };
        
        this.nextPage = this.nextPage.bind(this);
        this.showingChat = this.showingChat.bind(this);
        this.showingSticker = this.showingSticker.bind(this);
        this.showingQuiz = this.showingQuiz.bind(this);
        this.showingTeam = this.showingTeam.bind(this);
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
    
    
    showingQuiz(){
        this.setState({
            quizClicked: !this.state.quizClicked
    });
    }
    
    showingTeam(){
        this.setState({
            teamClicked: !this.state.teamClicked
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
        
        
                    
        
                    <div id="buttonDiv">
        
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
                             
                             
                            {this.state.quizClicked ?
                            <Quiz  
                                    closePopup={this.showingQuiz.bind(this)}
                                        />
                                        : null
                            }
                             
                             
                             <button className="quizBut" onClick={this.showingQuiz.bind(this)}>Start the Quiz</button>  
   
                             
                             {this.state.teamClicked ?
                            <Team   
                                    closePopup={this.showingTeam.bind(this)}
                                        />
                                        : null
                            }
                            
                             <button className="teamBut" onClick={this.showingTeam.bind(this)}>&#x21EA;</button>
        
        
        
                             
                             
                    </div>
        
                
            </div>
        
        </div>
    );
  }
}
        
        
export default Landing;
