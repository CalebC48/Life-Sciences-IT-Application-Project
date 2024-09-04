import React from 'react';
import contactsDatabase from './/contactsDatabase.json';
import "./visualDatabase.css";

function VisualDatabase() {

    return (  
        <>
        <table className = "contactsTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {contactsDatabase.map((person, index) => (
                    <tr key = {index}>
                        <td>{person.name}</td>
                        <td>{person.address}</td>
                        <td>{person.phone_number}</td>
                        <td>{person.email}</td>
                        <td>{person.category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default VisualDatabase;
