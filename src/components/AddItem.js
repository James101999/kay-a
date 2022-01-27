import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { useState } from 'react';

export default function AddItem() {
    // syntax: type-of-data [statedate, stateupdatefunction] = useState(initialdata);
    const [items, setItem] = useState([]);

    // AddItem Handler
    const addItem = (event) => {
        event.preventDefault();
        // console.log(event.target);
        const formData = event.target;
        const newItem = {
            item_name: formData.item_name.value,
            expiration_date: formData.expiration_date.value,
            quantity: Number(formData.quantity.value)
        };
        // console.log("newItem", newItem);

        // Add item inside items[]
        setItem([...items, newItem]);
        console.log("items", items);
    };

    const incrementQuantity = (event) => {
        // console.log(event.target.value)
        const itemIndex = event.target.value;
        items[itemIndex].quantity = items[itemIndex].quantity + 1;
        setItem([...items])
        // console.log(items)
    };

    const decrementQuantity = (event) => {
        // console.log(event.target.value)
        const itemIndex = event.target.value;
        items[itemIndex].quantity = items[itemIndex].quantity - 1;
        setItem([...items])
        // console.log(items)
    };


    return (
        <div>
            <div id="addItemForm">
                <Form onSubmit={addItem}>
                    <Form.Group className="mb-3" controlId="formBasicItemName">
                        <Form.Label>Item Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter item's name" name="item_name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicExpirationDate">
                        <Form.Label>Expiration or Best Before Date:</Form.Label>
                        <Form.Control type="text" placeholder="Enter item's expiration or best before date" name="expiration_date" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicQuantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control type="text" placeholder="Enter item's quantity" name="quantity" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </div>

            <div id="itemTable">
                <Table striped bordered hover variant="dark">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Expiration or Best Before Date</th>
                            <th>Quantity</th>
                            <th>Update Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {index + 1} </td>
                                        <td> {item.item_name} </td>
                                        <td> {item.expiration_date} </td>
                                        <td> {item.quantity} </td>
                                        <td>
                                            <Button variant="success" onClick={event => incrementQuantity(event)} value={index}>Add</Button>
                                            <Button variant="danger" onClick={event => decrementQuantity(event)} value={index}>Minus</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </div>
        </div>
    );
}