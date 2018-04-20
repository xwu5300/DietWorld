import React, { Component } from 'react';
import { AutoComplete, Paper, IconButton } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      zipcode: ''
    }
    this.updateTerm = this.updateTerm.bind(this);
    this.updateZipcode = this.updateZipcode.bind(this);
  }

  updateTerm(value) {
    this.setState({
      term: value
    })
  }

  updateZipcode(value) {
    this.setState({
      zipcode: value
    })
  }

  render() {
    return (
      <Paper>
        Find  
        <AutoComplete
          style={{marginLeft: '10px'}}
          dataSource={[]}
          ref={'autocomplete'}
          hintText='Restaurant'
          onUpdateInput={this.updateTerm}
        />
        
        Near  
        <AutoComplete
          style={{marginLeft: '10px'}}
          dataSource={[]}
          ref={'autocomplete'}
          hintText='Zip Code'
          onUpdateInput={this.updateZipcode}
        />
        <IconButton 
          onClick={() => this.props.getRestaurants({params: {term: `Paleo ${this.state.term}`, location: this.state.zipcode, radius: 20000}})}
        >
          <ActionSearch />
        </IconButton>
      </Paper>
    )
  }
}

export default Search;