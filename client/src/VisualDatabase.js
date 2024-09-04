import React, {useState, useEffect} from 'react';
// import contactsDatabase from './/contactsDatabase.json';
import axios from 'axios';
import "./visualDatabase.css";

function VisualDatabase() {
    const [editIndex, setEditIndex] = useState(null);
    const [contactsDatabase, setContactsDatabase] = useState([]);
    const [editPerson, setEditPerson] = useState({});

    const handleSave = (index) => {
        axios
        .post('http://localhost:5000/editPerson', { index, person: editPerson })
        .then(() => {
            setEditPerson({});        
            setEditIndex(null);

        })
        .catch((error) => {
            console.error('Error updating contact:', error);
            setEditIndex(null);
        });
    };

    const handleEdit = (index, person) => {
        setEditIndex(index);
        setEditPerson(person);
    };

    const handleInputChange = (e, field) => {
        setEditPerson({
            ...editPerson,
            [field]: e.target.value,
        });
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
      }, [editIndex]);

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
                                <button onClick={() => handleEdit(index, person)}>Edit</button>
                            </td>
                            </>
                        ) : (
                            <>
                            <td>
                                <textarea value={editPerson.name} onChange={(e) => handleInputChange(e, 'name')}></textarea>
                            </td>
                            <td>
                                <textarea value={editPerson.address} onChange={(e) => handleInputChange(e, 'address')}></textarea>
                            </td>
                            <td>
                                <textarea value={editPerson.phone_number} onChange={(e) => handleInputChange(e, 'phone_number')}></textarea>
                            </td>
                            <td>
                                <textarea value={editPerson.email} onChange={(e) => handleInputChange(e, 'email')}></textarea>
                            </td>
                            <td>
                                <textarea value={editPerson.category} onChange={(e) => handleInputChange(e, 'category')}></textarea>
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
