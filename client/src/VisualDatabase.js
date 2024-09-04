import React, {useState, useEffect} from 'react';
// import contactsDatabase from './/contactsDatabase.json';
import axios from 'axios';
import "./visualDatabase.css";

function VisualDatabase() {
    const [editIndex, setEditIndex] = useState(null);
    const [contactsDatabase, setContactsDatabase] = useState([]);
    const handleSave = () => {
        setEditIndex(null);
    };

    useEffect(() => {
        axios
          .get('http://localhost:5000/contacts')
          .then((response) => {
            setContactsDatabase(response.data); 
          })
          .catch((error) => {
            console.error('Error fetching contacts:', error);
          });
      }, []);

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
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {contactsDatabase.map((person, index) => (
                    <tr key = {index}>
                        {editIndex !== index ? (
                            <>
                            <td>{person.name}</td>
                            <td>{person.address}</td>
                            <td>{person.phone_number}</td>
                            <td>{person.email}</td>
                            <td>{person.category}</td>
                            <td>
                                <button onClick={() => setEditIndex(index)}>Edit</button>
                            </td>
                            </>
                        ) : (
                            <>
                            <td>
                                <textarea value={person.name}></textarea>
                            </td>
                            <td>
                                <textarea value={person.address}></textarea>
                            </td>
                            <td>
                                <textarea value={person.phone_number}></textarea>
                            </td>
                            <td>
                                <textarea value={person.email}></textarea>
                            </td>
                            <td>
                                <textarea value={person.category}></textarea>
                            </td>
                            <td>
                                <button onClick={() => handleSave(index)}>Save</button>
                            </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default VisualDatabase;
