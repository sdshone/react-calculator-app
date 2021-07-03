import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as math from "mathjs";
// Functional Component
const DisplayWindow = (props) => (<input type='text' value={props.expression} disabled='true'/>);

class Button extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onKeyPressed(this.props.text);
  }

  render() {
    return <button onClick={this.onClick}>{this.props.text}</button>;
  }
}

class Calculator extends React.Component {
  constructor () {
    super();

    this.state = {
      expression: ''
    }

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onEvaluatePressed = this.onEvaluatePressed.bind(this);
    this.onDeletePressed = this.onDeletePressed.bind(this);
  }

  onKeyPressed(text) {
    this.setState((prev) => ({expression: prev.expression + text}));
  }

  onEvaluatePressed() {
    const result = math.eval(this.state.expression);
    this.setState({expression: result.toString()});
  }

  onDeletePressed() {
    this.setState((prev) => ({
      expression: prev.expression.length <= 1 ? '' : prev.expression.slice(0, -1)}));
  }

  render() {

    return (
    <div>

         <table>
            <tr>
               <td colspan="4">
                  <DisplayWindow expression={this.state.expression}/>
               </td>
            </tr>
            <tr>
               <td><Button name="one" text="1" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="two" text="2" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="three" text="3" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button class="operator" name="plus" text="+" onKeyPressed={this.onKeyPressed}/></td>
            </tr>
            <tr>
               <td><Button name="four" text="4" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="five" text="5" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="six" text="6" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button class="operator" name="minus" text="-" onKeyPressed={this.onKeyPressed}/></td>
            </tr>
            <tr>
               <td><Button name="seven" text="7" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="eight" text="8" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="nine" text="9" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button class="operator" name="times" text="*" onKeyPressed={this.onKeyPressed}/></td>
            </tr>
            <tr>
               <td><Button id="clear" name="clear" text="C" onKeyPressed={this.onDeletePressed}/></td>
               <td><Button name="zero" text="0" onKeyPressed={this.onKeyPressed}/></td>
               <td><Button name="doit" text="=" onKeyPressed={this.onEvaluatePressed}/></td>
               <td><Button class="operator" name="div" text="/" onKeyPressed={this.onKeyPressed}/></td>
            </tr>
         </table>

    </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
