import React,{useState,useRef,useContext} from "react";

// react-router-dom components
import {Link,useHistory} from "react-router-dom";
import {Card,Alert,Form,Button,Container,CloseButton} from "react-bootstrap";
import {signup,logout} from "../../../context/softUIContext";
import "bootstrap/dist/css/bootstrap.min.css"
import {SoftUI} from "../../../context/softUIContext"

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";
import BasicLayout from "../../../layouts/authentication/components/BasicLayout";

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)
  const history = useHistory()
  async function handleSubmit(e) {
    e.preventDefault()
    if (String(passwordRef.current.value) !== String(passwordConfirmRef.current.value)) {
      return setError("Passwords do not match")}
    if (String(passwordRef.current.value).length<7){
      return setError("Your password should be at least 6 characters long")
    }
    try { 
      setError("")
      setLoading(true)
      signup(String(emailRef.current.value), String(passwordRef.current.value)).then((userCredential) => {toggleUser(userCredential.user)})
    } 
    catch {setError("Failed to create an account")}
    setLoading(false)
    history.push("/")
  }
  async function handleClose(e){
    e.preventDefault()
    history.push("/")
  }
  async function handleLogOut(e){
    e.preventDefault()
    logout()
    toggleUser({})
    history.push("/authentication/login")
  }
  if (Object.keys(currentUser).length !== 0) {
    return (
      <BasicLayout title="Hello user" description="You already signed-in" image={curved6}>
      <Button variant="danger" className="w-100" onClick={handleLogOut}>Log Out</Button>
      <Button onClick={handleClose} className="w-100">Home</Button>
      </BasicLayout>
    )
  }
  else{
  return (
    <BasicLayout
      title="Sign up"
      image={curved6}>

    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "10vh"}}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
      <CloseButton onClick={handleClose}/>
      <Card>
        <Card.Body >
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm password" required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" color="darkblue">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/authentication/login">Log In</Link>
      </div>
      </div>
      </Container>
      </BasicLayout>
  )}
}
