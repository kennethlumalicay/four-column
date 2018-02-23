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
            'salad',
            'pizza'
          ]
        },
        {
          name: 'banana',
          cards: [
            'grapes',
            'hamburger'
          ]
        },
        {
          name: 'bacon',
          cards: [
            'adobo',
            'tuna'
          ]
        },
        {
          name: 'tomato',
          cards: [
            'spaghetti',
            'carbonara'
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

  handleSwitch(event, dir, index, msg, msgIndex) {
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
          cards: [...e.cards.filter((e,cardIndex) => msgIndex !== cardIndex)]
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
              handleLeftRight={(e, dir, msg, msgIndex) => this.handleSwitch(e, dir, i, msg, msgIndex)}
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
          handleLeftRight={(event, dir) => props.handleLeftRight(event, dir, e, i)}
        />
      )
      : null
    }
    <div className='button-container'>
      <button onClick={e => props.handleAdd(e)} >Add</button>
    </div>
  </div>
);

const Card = props => (
  <div className='card'>
    {
      props.leftEdge
      ? <span className='invisible-span'></span>
      : <button onClick={e => props.handleLeftRight(e, 'left')}>{'<'}</button>
    }
    
    <p>{props.message}</p>

    {
      props.rightEdge
      ? <span className='invisible-span'></span>
      : <button onClick={e => props.handleLeftRight(e, 'right')}>{'>'}</button> 
    }
    
  </div>
);

export default App;