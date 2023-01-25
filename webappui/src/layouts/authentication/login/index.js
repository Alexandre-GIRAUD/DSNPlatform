import {useState,useRef,useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import {Alert,Card,Button,Form,Container,CloseButton} from "react-bootstrap";
import {login,logout} from "../../../context/softUIContext";
import "bootstrap/dist/css/bootstrap.min.css"

// Images
import curved9 from "../../../assets/images/curved-images/curved-6.jpg";
import CoverLayout from "../components/CoverLayout";
import {SoftUI} from "../../../context/softUIContext"

function LogIn() {
  //
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [controller,dispatch,currentUser,toggleUser] = useContext(SoftUI)
  const history = useHistory()
  //
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(String(emailRef.current.value),String(passwordRef.current.value))
      .then((userCredential) => {toggleUser(userCredential.user)});
      history.push("/")
    } catch {setError("Woopsy, Failed to log in")}
    setLoading(false)
  }
  async function handleLogOut(e){
    e.preventDefault()
    logout()
    toggleUser({})
    history.push("/authentication/login")
  }
  
  async function handleClose(e){
    e.preventDefault()
    history.push("/")
  }

  if (Object.keys(currentUser).length !== 0) {
    return (
      <CoverLayout title="Hello user" description="You already signed-in" image={curved9}>
      <Button variant="danger" className="w-100" onClick={handleLogOut}>Log Out</Button>
      <Button onClick={handleClose} className="w-100">Home</Button>
      </CoverLayout>
    )
  } else {
  return (
    <CoverLayout
      title="Welcome back" description="Enter your email and password to sign in" image={curved9}>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "10vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <CloseButton onClick={handleClose}/>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/authentication/sign-up">Sign Up</Link>
        </div>
      </div>
      </Container>
      </CoverLayout>
  )}
}

export default LogIn;
