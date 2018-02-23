import React, { Component } from 'react';
import './css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnData: [
        {
          name: 'apple',
          cards: [
            'cool',
            'awesome'
          ]
        },
        {
          name: 'banana',
          cards: [
            'dood',
            'hey'
          ]
        },
        {
          name: 'bacon',
          cards: [
            'let\'s go!',
            'mooooo!'
          ]
        },
        {
          name: 'tomato',
          cards: [
            'believe',
            'quack'
          ]
        },
      ]
    }
  }

  handleAdd(event, name) {
    const card = window.prompt();
    
    if(!card) return;

    const newColumnData = this.state.columnData.map(e => {
      if(e.name === name) {
        e.cards.push(card);
      }
      return e;
    });

    this.setState({
      columnData: newColumnData
    });
  }

  handleSwitch(event, dir, index, msg) {
    const left = dir === 'left';
    const newColumnData = this.state.columnData.map((e,i) => {
      if((index-1 === i && left) || (index+1 === i && !left)) {
        return {
          ...e,
          cards: [
            ...e.cards,
            msg
          ]
        };
      }
      if(index === i) {
        return {
          ...e,
          cards: [...e.cards.filter(e => e !== msg)]
        }
      }
      return e;
    });
    this.setState({
      columnData: newColumnData
    });
  }

  render() {
    return (
      <div className='app'>
        {
          this.state.columnData.map((e,i) =>
            <Column {...e}
              key={e.name}
              handleAdd={event => this.handleAdd(event, e.name)}
              leftEdge={i < 1}
              rightEdge={i === this.state.columnData.length - 1}
              handleLeftRight={(e, dir, msg) => this.handleSwitch(e, dir, i, msg)}
            />
          )
        }
      </div>
    );
  }
}


const Column = props => (
  <div className='column'>
    <div className='column-name'>
      <h4>{props.name}</h4>
    </div>
    {
      props.cards ? props.cards.map((e,i) =>
        <Card
          key={e + i + ''}
          message={e}
          leftEdge={props.leftEdge}
          rightEdge={props.rightEdge}
          handleLeftRight={(event, dir) => props.handleLeftRight(event, dir, e)}
        />
      )
      : null
    }
    <div>
      <button onClick={e => props.handleAdd(e)} >Add</button>
    </div>
  </div>
);

const Card = props => (
  <div className='card'>
    {
      props.leftEdge
      ? null
      : <button onClick={e => props.handleLeftRight(e, 'left')}>{'<'}</button>
    }
    
    <p>{props.message}</p>

    {
      props.rightEdge
      ? null
      : <button onClick={e => props.handleLeftRight(e, 'right')}>{'>'}</button> 
    }
    
  </div>
);

export default App;