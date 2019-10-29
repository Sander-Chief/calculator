import React from 'react';
import ReactDOM from 'react-dom';
import css from './index.css';

const lastOperator = /[+\-\/\*]$/;

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

const Button = ({id, value, className, onClick}) => <button id={id} value={value} className={className} onClick={onClick}>{value}</button>;

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
    return (
      <div className='calc'>
        <History {...{previousValue}}/>
        <Display {...{currentValue}}/>
        <Container className='container'>
          <Button
            id='clear'
            value='C'
            className='btn btn-double'
            onClick={this.handleClear}>C</Button>
          <Button value='' className='btn'></Button>
          <Button
            id='divide'
            value='/'
            className='btn btn-orange'
            onClick={this.handleOperator}>/</Button>
        </Container>
        <Container className='container'>
          <Button id='seven' value='7' className='btn' onClick={this.handleNumber}>7</Button>
          <Button id='eight' value='8' className='btn' onClick={this.handleNumber}>8</Button>
          <Button id='nine' value='9' className='btn' onClick={this.handleNumber}>9</Button>
          <Button
            id='multiply'
            value='*'
            className='btn btn-orange'
            onClick={this.handleOperator}>*</Button>
        </Container>
        <Container className='container'>
          <Button id='four' value='4' className='btn' onClick={this.handleNumber}>4</Button>
          <Button id='five' value='5' className='btn' onClick={this.handleNumber}>5</Button>
          <Button id='six' value='6' className='btn' onClick={this.handleNumber}>6</Button>
          <Button
            id='subtract'
            value='-'
            className='btn btn-orange'
            onClick={this.handleOperator}>-</Button>
        </Container>
        <Container className='container'>
          <Button id='one' value='1' className='btn' onClick={this.handleNumber}>1</Button>
          <Button id='two' value='2' className='btn' onClick={this.handleNumber}>2</Button>
          <Button id='three' value='3' className='btn' onClick={this.handleNumber}>3</Button>
          <Button
            id='add'
            value='+'
            className='btn btn-orange'
            onClick={this.handleOperator}>+</Button>
        </Container>
        <Container className='container'>
          <Button id='decimal' value='.' className='btn' onClick={this.handleDecimal}>.</Button>
          <Button id='zero' value='0' className='btn' onClick={this.handleNumber}>0</Button>
          <Button
            id='equals'
            value='='
            className='btn btn-double btn-orange'
            onClick={this.handleEvaluation}>=</Button>
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