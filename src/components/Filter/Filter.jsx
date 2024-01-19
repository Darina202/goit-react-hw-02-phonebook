import { Component } from 'react';

class Filter extends Component {
  state = {
    filter: '',
  };

  changeFitler = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts(contacts) {
    const { filter } = this.state;
    // const contacts = this.props;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });

    return filteredContacts;
  }

  render() {
    const { changeFitler } = this;
    const contacts = this.props;
    // const filContacts = this.getFilteredContacts(contacts);
    return (
      <>
        <p>Find contact by name</p>
        <input type="text" name="filter" onChange={changeFitler} />
      </>
    );
  }
}

export default Filter;
