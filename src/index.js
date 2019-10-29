import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';

const lastOperator = /[+\-\/\*]$/;

const buttons = [
  {
    value: '=',
    handler: 'handleEvaluation',
    id: 'equals',
    className: 'btn btn-double btn-orange',
  },
  {
    id: 'zero',
    value: '0',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'decimal',
    value: '.',
    className: 'btn',
    handler: 'handleDecimal',
  },
  {
    id: 'add',
    value: '+',
    className: 'btn btn-orange',
    handler: 'handleOperator',
  },
  {
    id: 'three',
    value: '3',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'two',
    value: '2',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'one',
    value: '1',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'subtract',
    value: '-',
    className: 'btn btn-orange',
    handler: 'handleOperator',
  },
  {
    id: 'six',
    value: '6',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'five',
    value: '5',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'four',
    value: '4',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'multiply',
    value: '*',
    className: 'btn btn-orange',
    handler: 'handleOperator',
  },
  {
    id: 'nine',
    value: '9',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'eight',
    value: '8',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'seven',
    value: '7',
    className: 'btn',
    handler: 'handleNumber',
  },
  {
    id: 'divide',
    value: '/',
    className: 'btn btn-orange',
    handler: 'handleOperator',
  },
  {
    id: '',
    value: '',
    className: 'btn',
    handler: null,
  },
  {
    id: 'clear',
    value: 'C',
    className: 'btn btn-double',
    handler: 'handleClear',
  },

].reverse();

const Display = ({currentValue}) => <div className='container'>
  <div id='display' className='display'>
    {currentValue}
  </div>
</div>;

const History = ({previousValue}) => <div className='container'>
  <div className='history'>
    {previousValue}
  </div>
</div>;

const Button = ({id, value, className, onClick = () => {}}) => <button id={id} value={value} className={className} onClick={onClick}>{value}</button>;

const Container = ({children}) => <div className='container'>{children}</div>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      previousValue: ''
    }
  }

  handleClear = () => {
    this.setState({currentValue: '0', previousValue: ''});
  }

  maxDigits = () => {
    document
      .getElementById('display')
      .innerHTML = 'Number is too big';
    setTimeout(() => {
      document
        .getElementById('display')
        .innerHTML = this.state.currentValue;
    }, 1000);
  }

  handleNumber = e => {
    if (this.state.currentValue.length > 16 && !lastOperator.test(this.state.currentValue)) {
      this.maxDigits();
    } else if (lastOperator.test(this.state.currentValue)) {
      this.setState({
        previousValue: this.state.previousValue += this.state.currentValue,
        currentValue: e.target.value
      });
    } else {
      this.setState({
        currentValue: this.state.currentValue += e.target.value
      });
    };
    if (this.state.currentValue.charAt(0) === '0' && this.state.currentValue.charAt(1) !== '.') {
      this.setState({
        currentValue: this
          .state
          .currentValue
          .substr(1)
      });
    };
  }

  handleDecimal = e => {
    if (this.state.currentValue.indexOf('.') === -1) {
      this.setState({
        currentValue: this.state.currentValue += e.target.value
      });
    };
  }

  handleOperator = e => {
    !lastOperator.test(this.state.currentValue)
      ? this.setState({
        currentValue: this.state.currentValue += e.target.value
      })
      : this.setState({
        currentValue: this
          .state
          .currentValue
          .slice(0, -1) + e.target.value
      })
  }

  handleEvaluation = () => {
    let evalString = this.state.previousValue += this.state.currentValue;
    if (lastOperator.test(evalString)) {
      evalString = evalString.slice(0, -1);
    }
    let answer = Math.round(1000000 * eval(evalString)) / 1000000;
    this.setState({
      previousValue: '',
      currentValue: answer.toString()
    });
  }


  render() {
    const {currentValue, previousValue} = this.state;
    const handlers = {
      'handleNumber': this.handleNumber,
      'handleClear': this.handleClear,
      'handleEvaluation': this.handleEvaluation,
      'handleOperator': this.handleOperator,
      'handleDecimal': this.handleDecimal
    }
    return (
      <div className='calc'>
        <History {...{previousValue}}/>
        <Display {...{currentValue}}/>
        <Container>
          {
            buttons.map((element, i)=> i < 3 && <Button key={element.value} id={element.id} value={element.value} className={element.className} onClick={handlers[element.handler]} />)
          }
        </Container>
        <Container>
          {
            buttons.map((element, i)=> i >= 3 && i < 7 && <Button key={element.value} id={element.id} value={element.value} className={element.className} onClick={handlers[element.handler]} />)
          }
        </Container>
        <Container>
          {
            buttons.map((element, i)=> i >= 7 && i < 11 && <Button key={element.value} id={element.id} value={element.value} className={element.className} onClick={handlers[element.handler]} />)
          }
        </Container>
        <Container>
          {
            buttons.map((element, i)=> i >= 11 && i < 15 && <Button key={element.value} id={element.id} value={element.value} className={element.className} onClick={handlers[element.handler]} />)
          }
        </Container>
        <Container>
          {
            buttons.map((element, i)=> i >= 15 && <Button key={element.value} id={element.id} value={element.value} className={element.className} onClick={handlers[element.handler]} />)
          }
        </Container>
      </div>
    )
  };
}



ReactDOM.render(
  <App/>, document.getElementById('root'));

module
  .hot
  .accept();