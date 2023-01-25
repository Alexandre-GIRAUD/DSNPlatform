// Soft UI Dashboard React components

import { Card, Alert, Form, Button, Container } from "react-bootstrap";
import React, { useState, useRef, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
// Soft UI Dashboard React example components
import 'react-dropdown/style.css';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import "./mainstyles.css"
import { SoftUI } from "../../context/softUIContext"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";

function Dataset_Creation() {


    const [error, setError] = useState("")
    const datasetNameRef = useRef("")
    const statusRef = useRef("")
    const descriptionRef = useRef("")
    const formatRef = useRef("")
    const locationRef = useRef("")
    const labelRef = useRef("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [img, setImg] = useState()

    const [controller, dispatch, currentUser, toggleUser] = useContext(SoftUI)

    function fileSelectedHandler(e) {
        console.log(e.target.files[0].name)
        setImg(e.target.files[0])
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (datasetNameRef.current.value == "") {
            return setError("Choose a name for your dataset")
        }
        try {
            setLoading(true)
            const response = axios.get(`http://127.0.0.1:5001/v2/createBuckets/${datasetNameRef.current.value}/${locationRef.current.value}/${statusRef.current.value}/${formatRef.current.value}/${descriptionRef.current.value}/${labelRef.current.value}/${currentUser.uid}`)
            const fd = new FormData();
            if (typeof myVar !== 'undefined') {
                fd.append('image', img, datasetNameRef.current.value);
                const upload = axios.post("http://127.0.0.1:5001/v2/uploadImage", fd)
            }
            history.push("/")
        } catch { setError("Creation failed, please retry") }
    }


    if (Object.keys(currentUser).length === 0) {
        return (
            <DashboardLayout>
                <ul>
                    <li><Link to='/authentication/sign-up'>Sign Up</Link></li>
                    <li><Link to='/authentication/login'>Login</Link></li>
                </ul>
            </DashboardLayout>)
    } else {
        return (
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "900px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Dataset Creation</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="datasetname" >
                                    <Form.Label>Dataset Name</Form.Label>
                                    <Form.Control type="text" ref={datasetNameRef} placeholder="Dataset name" required />
                                </Form.Group>
                                <Form.Group id="dropdowns">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select ref={statusRef}>
                                        <option>Private</option>
                                        <option>Public</option>
                                    </Form.Select>
                                    <Form.Label>Localisation</Form.Label>
                                    <Form.Select ref={locationRef}>
                                        <option>eu</option>
                                        <option>us</option>
                                    </Form.Select>
                                    <Form.Label>Format</Form.Label>
                                    <Form.Select ref={formatRef}>
                                        <option>png</option>
                                        <option>jpeg</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group id="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="input" ref={descriptionRef} />
                                </Form.Group>
                                <Form.Group id="description">
                                    <Form.Label>Labels : Enter the possible labels of your data spaced out by comma </Form.Label>
                                    <Form.Control type="input" ref={labelRef} />
                                </Form.Group>
                                <Form.Group id="Image Presentation">
                                    <Form.Label>Image Presentation</Form.Label>
                                    <Form.Control name="img" type="file" onChange={fileSelectedHandler} accept=".png,.jpeg,.jpg" />
                                </Form.Group>
                                <br></br>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Create Dataset
                                </Button>

                            </Form >
                        </Card.Body >
                    </Card >
                </div >
            </Container >
        )
    }
}
export default Dataset_Creation;
