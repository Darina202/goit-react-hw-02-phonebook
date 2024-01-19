import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './contact-form.module.css';

class ContactForm extends Component {
  nameId = nanoid();
  numberId = nanoid();

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { nameId, numberId, handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={nameId} className={styles.label}>
            Name
          </label>
          <input value={name} type="text" name="name" id={nameId} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={numberId} className={styles.label}>
            Number
          </label>
          <input value={number} type="tel" name="number" id={numberId} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
