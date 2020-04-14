import React, { useState } from 'react';
import CountryOne from './CountryOne';

const Countries = ({ countries }) => {
    return (
        <div>
            {countries.map(country => (
                <>
                    <Country key={country.cioc} country={country} />
                </>
            ))}
        </div>
    )
}

const Country = ({ country }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <>
            <p>{country.name}</p>
            <button onClick={handleShow}>Show</button>
            {(show) ? <CountryOne country={country} /> : ''}
        </>
    );
}

export default Countries;