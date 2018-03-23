import React, { Component } from 'react';

import '../App.css';



class Team extends Component {
  
    
    constructor(props){
        super(props);
        
        this.state = {
         
        }
        

        
    }
    componentDidMount(){
       // this.socket = mySocket("http://localhost:10001");  
       //hi  
        
    }
    
    
 
  
    
    render() {
        
       

        return (
          
                <div className="teamMembers">
                    <div className="kaylie">
                      
                            <div className="kaylieCircle">
                                <a href="http://me.kaylieson.com/">KAYLIE SON  </a>

                            </div>

                    </div>


                    <div className="leo">
            
                            <div className="leoCircle">
                                LEO LOU
                            </div>

                    </div>    

                    <div className="sehee">
                     
                            <div className="seheeCircle">
                               <a href="http://seheeahn.ca/">  SEHEE AHN </a>
                            </div>
               


                    </div>
                   
                </div>
        
        );
      }
    }

export default Team;
