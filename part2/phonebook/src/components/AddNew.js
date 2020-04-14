import React from 'react';

const AddNew = ({ newName, newPhone, handleFormSubmit, handleNoteChange, handlePhoneChange }) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                name: <input value={newName} onChange={handleNoteChange} type="text" />
            </div>
            <div>
                phone number: <input value={newPhone} onChange={handlePhoneChange} type="number" />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddNew
