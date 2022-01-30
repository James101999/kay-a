import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

import { useEffect, useState } from 'react';

function AddItem() {
    // syntax: type-of-data [statedate, stateupdatefunction] = useState(initialdata);
    const [items, setItem] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let fetchedData = localStorage.getItem('items_LocalStorage');

        if (fetchedData) {
            let dataDict = JSON.parse(fetchedData);
            //console.log(dataDict)
            setItem(dataDict)
        }
    }, [])

    // AddItem Handler
    const addItem = (event) => {
        event.preventDefault();
        var i = 0;
        const formData = event.target;
        const newItem = {};
        const length = items.length

        if (length == 0) {
            newItem['item_name'] = formData.item_name.value;
            newItem['expiration_date'] = formData.expiration_date.value;
            newItem['quantity'] = Number(formData.quantity.value);

        } else {
            for (i = 0; i < length; i++) {
                let existingName = items[i]['item_name'];
                console.log(existingName);

                if (formData.item_name.value == existingName) {
                    newItem['item_name'] = formData.item_name.value + "(" + length.toString() + ")";
                    newItem['expiration_date'] = formData.expiration_date.value;
                    newItem['quantity'] = Number(formData.quantity.value);
                    break;
                }
                else {
                    newItem['item_name'] = formData.item_name.value;
                    newItem['expiration_date'] = formData.expiration_date.value;
                    newItem['quantity'] = Number(formData.quantity.value);
                }

            }

        }
        setItem([...items, newItem]);

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
        if (items[itemIndex].quantity < 0) {
            setItem(items.filter(item => item.item_name !== items[itemIndex].item_name))
            delete items[items[itemIndex].item_name];
        }
        // console.log(items);
    };

    const saveToLocalStorage = (event) => {
        localStorage.setItem("items_LocalStorage", JSON.stringify(items));
        handleClose();
    }

    const removeItem = (event) => {
        const itemIndex = event.target.value;
        // setItem([...items]);
        setItem(items.filter(item => item.item_name !== items[itemIndex].item_name))
        delete items[items[itemIndex].item_name];
    }


return (
    <div>
      <Stack direction="horizontal" gap={2}>
        <div className="ms-auto">
          <Button size="lg" variant="success" active
                  onClick={handleShow}>
            Add Item
          </Button>
        </div>
        <Button size="lg" variant="primary" active
                onClick={saveToLocalStorage}>
          Save
        </Button>
      </Stack>
          <Modal show={show} onHide={handleClose}>
            <Form onSubmit={addItem}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicItemName">
                <Form.Label>Item Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter item's name" name="item_name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicExpirationDate">
                <Form.Label>Expiration or Best Before Date:</Form.Label>
                <Form.Control type="date" placeholder="Enter item's expiration or best before date" name="expiration_date" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control type="number" placeholder="Enter item's quantity" name="quantity" />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
            </Form>
          </Modal>

            <div id="itemTable">
                <Table striped bordered hover >

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
                                            <Button variant="danger" onClick={event => decrementQuantity(event)} value={index} >Minus</Button>
                                            <Button variant="warning" onClick={event => removeItem(event)} value={index} >Remove</Button>
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
};

export default AddItem;
