import React, { Component } from 'react';
import Landing from './comp/Landing';
import Chat from './comp/Chat';
import Sticker from './comp/Sticker';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state={
            page:"",
        }
        this.changePage = this.changePage.bind(this);
 
        
    }
    
    changePage(data){
        this.setState({
            page:data
        })
    }

    
  render() {
      var comp = null;
      
      if(this.state.page =="" ||this.state.page =="Landing"){
          comp = <Landing changePage = {this.changePage} />
      
      }else if(this.state.page == "Chat"){
          comp = <Chat changePage = {this.changePage} />
      
      }else if(this.state.page == "Sticker"){
          comp = <Sticker changePage = {this.changePage} />
      
      }
      
    return (
      <div className="App">
        {comp}
        
      </div>
    );
  }
}

export default App;
