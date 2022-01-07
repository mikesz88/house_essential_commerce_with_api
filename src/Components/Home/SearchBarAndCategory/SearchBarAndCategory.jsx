import React from "react";
import style from './SearchBarAndCategory.module.css';

class SearchBarAndCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            activeButton: '',
        }
    }

    updateUserSearch = state => this.props.updateUserSearch(state); 

    updateChange = e => {
        e.preventDefault();
        this.updateUserSearch(e.target.value.toLowerCase())
    }

    updateButton = e => {
        e.preventDefault();
        if (e.target.value !== 'all') {
            this.updateUserSearch(e.target.value);
            this.setState({
                activeButton: e.target.value.toLowerCase(),
            })
        } else {
            this.updateUserSearch('');
            this.setState({
                activeButton: e.target.value.toLowerCase(),
            })
        }
    }
    
    render() { 
        const buttonCategories = ['all' ,'kitchen', 'living-room', 'bathroom', 'bedroom', 'office'];

        return (
            <>
                <div className={style.searchContainer}>
                    <input 
                        className={style.inputStyle} 
                        onChange={this.updateChange} 
                        type="text" 
                        name="search" 
                        id="search" 
                        placeholder="Search Products..."
                        />
                </div>
                <div className={style.categoryContainer}>
                    {buttonCategories.map((category, index) => (
                        <button
                            key={index}
                            id={category} 
                            value={category} 
                            onClick={this.updateButton} 
                            className={`btn ${this.state.activeButton === category ? style.activeColor : null}`}>
                                {category}
                        </button>
                    ))}
                    
                </div>
            </>
        )
    }
}

export default SearchBarAndCategory;