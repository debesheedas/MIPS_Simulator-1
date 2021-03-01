import React, {Component} from 'react';
import './Card.css';
// import '../../../App.js';
import Codes from './Codes.js';
import {Link} from 'react-router-dom';

class DropDownCard extends Component{

    constructor() {
        super();
        
        this.state = {
          displayMenu: false,
        //   app: new App(),
          
        }
        
        this.displayMenu = this.displayMenu.bind(this);
        // this.app=this.app.bind(this);
        this.bubbleSort=this.bubbleSort.bind(this);
        this.testcodes=this.testcodes.bind(this);
        this.fibonacci=this.fibonacci.bind(this);
      }

      

      bubbleSort(){
        //   console.log('hello');
        // const app = new App();
        
        const codes = new Codes();
        this.props.setCode(codes.bubbleSort);
        this.setState({
            displayMenu: false,
        });
      }

      testcodes(){
        //   console.log('hello');
        // const app = new App();
        const codes = new Codes();
        this.props.setCode(codes.testcode);
        this.setState({
            displayMenu: false,
        });
      }

      fibonacci(){
        const codes = new Codes();
        this.props.setCode(codes.fibonacci);
        this.setState({
            displayMenu: false,
        });
      }
      
      displayMenu(event) {
        event.preventDefault();
        if(!this.state.displayMenu){
            this.setState({
                displayMenu: true,
            });
        }
        else{
            this.setState({
                displayMenu: false,
            });
        }
      }

    render(){
        
        // console.log(app.state.pc);

        return(
            <div id="help-menu">
                <button id="help-button" onClick={this.displayMenu}>
                    <p id="help-menu-button"> HELP </p>
                </button>
                {this.state.displayMenu===true?(
                <div>
                    <Link id="link-id" to='/information'><button id="opened" className="a-button">Instructions</button></Link>
                    <span id="opened" className="non-button">Sample Programs</span>
                    <button onClick={this.bubbleSort} id="opened" className="ns a-button">BubbleSort.asm</button>
                    <button onClick={this.fibonacci} id="opened" className="ns a-button">Fibonacci.asm</button>
                    <button onClick={this.testcodes} id="opened" className="ns a-button">test.asm</button>
                </div>):(null)
                }
                
            </div>
        );
    }

}
 
export default DropDownCard;