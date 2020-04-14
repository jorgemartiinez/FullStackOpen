import React from 'react';

const Search = ({handleSearch}) => {

    return (
        <div>
            find countries <input onChange={handleSearch} />
        </div>
    )
}

export default Search
