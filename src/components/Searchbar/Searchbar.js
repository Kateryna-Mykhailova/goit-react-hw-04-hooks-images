import React from 'react';
import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChange = e => {
    this.setState({
      searchName: e.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      //   alert('Enter a search name')
      toast.warn('Enter a search name');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchForm_button}>
            <AiOutlineSearch />
            <span className={styles.SearchFormButton_label}>Search</span>
          </button>

          <input
            className={styles.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
