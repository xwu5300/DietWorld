import React from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color1: 'white',
      color2: 'white',
      color3: 'white',
      color4: 'white',
      clicked1: false,
      clicked2: false,
      clicked3: false,
      clicked4: false
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }
  
  handleClick(price) {
    if (price === 1) {    
      this.setState({
        clicked1: !this.state.clicked1
      }, () => this.updateColor(1))
    }
    if (price === 2) {    
      this.setState({
        clicked2: !this.state.clicked2
      }, () => this.updateColor(2))
    }
    if (price === 3) {    
      this.setState({
        clicked3: !this.state.clicked3
      }, () => this.updateColor(3))
    }
    if (price === 4) {    
      this.setState({
        clicked4: !this.state.clicked4
      }, () => this.updateColor(4))
    }
  }

  updateColor(color) {
    if (color === 1) {
      if (this.state.clicked1) {
        this.setState({
          color1: '#bbe8b9'
        }) 
      }
      else {
        this.setState({
          color1: 'white'
        })
      }
    }
    if (color === 2) {
      if (this.state.clicked2) {
        this.setState({
          color2: '#bbe8b9'
        }) 
      }
      else {
        this.setState({
          color2: 'white'
        })
      }
    }
    if (color === 3) {
      if (this.state.clicked3) {
        this.setState({
          color3: '#bbe8b9'
        }) 
      }
      else {
        this.setState({
          color3: 'white'
        })
      }
    }
    if (color === 4) {
      if (this.state.clicked4) {
        this.setState({
          color4: '#bbe8b9'
        }) 
      }
      else {
        this.setState({
          color4: 'white'
        })
      }
    }
  }

  render () {
    return (
      <Paper>
        <RaisedButton
          backgroundColor={this.state.color1}
          style={{marginRight: "5px"}}
          label='$'
          onClick={() => {
            this.props.updatePrice1()
            this.handleClick(1)
          }}
        />
        <RaisedButton
          backgroundColor={this.state.color2}
          style={{marginRight: "5px"}}
          label='$$'
          onClick={() => {
            this.props.updatePrice2()
            this.handleClick(2)
          }}
        />
        <RaisedButton
          backgroundColor={this.state.color3}
          style={{marginRight: "5px"}}
          label='$$$'
          onClick={() => {
            this.props.updatePrice3()
            this.handleClick(3)
          }}
        />
        <RaisedButton
          backgroundColor={this.state.color4}
          label='$$$$'
          onClick={() => {
            this.props.updatePrice4()
            this.handleClick(4)
          }}
        />
      </Paper>
    )
  }
}

export default Filter;