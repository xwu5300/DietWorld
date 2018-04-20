import React, { Component } from 'react';
import { Paper, SelectField, MenuItem } from 'material-ui';

class Sort extends Component {
  constructor({props}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt, idx, value) {
    console.log('evt.target.value', value)
    this.props.sortRestaurant(value)
  }

  render() {
    return (
      <Paper>
        <SelectField
          floatingLabelText="Sort By"
        //   value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={1} primaryText="Price: Low to High" />
          <MenuItem value={2} primaryText="Price: High to Low" />
          <MenuItem value={3} primaryText="Distance" />
          <MenuItem value={4} primaryText="Rating" />
          <MenuItem value={5} primaryText="Review Count" />
        </SelectField>
      </Paper>
    )

  }
}

export default Sort;