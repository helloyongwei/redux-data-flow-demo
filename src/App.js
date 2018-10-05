import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd'
import { createStore } from 'redux'

//reducers
const defaultState = {
  number: 1
}
function reducer(state = defaultState, action) {
  if (action.type === 'add_number') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.number += 1
    return newState
  }
  if (action.type === 'sub_number') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.number -= 1
    return newState
  }
  return state
}

//store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.handleUpdate.bind(this))
  }
  render() {
    return (
      <div>
        <div className="App" style={{marginLeft: '10px', marginBottom: '20px'}}>
          <div>{this.state.number}</div>
          <Button
            type="primary"
            style={{marginRight: '10px'}}
            onClick={this.handleAdd.bind(this)}
          >
            +
          </Button>
          <Button
            type="primary"
            onClick={this.handleSub.bind(this)}
          >
            -
          </Button>
        </div>
      </div>
    )
  }
  handleUpdate() {
    this.setState(store.getState())
  }
  handleAdd() {
    const action = {
      type: 'add_number',
    }
    store.dispatch(action)
  }
  handleSub() {
    const action = {
      type: 'sub_number',
    }
    store.dispatch(action)
  }
}

export default App;
