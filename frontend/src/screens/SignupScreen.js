import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nic, setNic] = useState('');
  const [phone, setphone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        nic,
        phone,
        address,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
  <Form.Label>Name</Form.Label>
  <Form.Group className="mb-3" controlId="name">
  
  <Form.Control
    onChange={(e) => {
      const nameValue = e.target.value;
      setName(nameValue);

      // Name validation regular expression (allows letters and spaces)
      const nameRegex = /^[A-Za-z\s]+$/;

      if (!nameRegex.test(nameValue)) {
        // Invalid name format
        e.target.setCustomValidity("Name should only contain letters and spaces");
      } else {
        // Valid name format
        e.target.setCustomValidity("");
      }
    }}
    required
  />
</Form.Group>

</Form.Group>


     <Form.Group className="mb-3" controlId="email">
  <Form.Label>Email</Form.Label>
  <Form.Control
    type="email"
    required
    onChange={(e) => {
      const emailValue = e.target.value;
      setEmail(emailValue);

      // Email validation regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailValue)) {
        // Invalid email format
        e.target.setCustomValidity("Invalid email address");
      } else {
        // Valid email format
        e.target.setCustomValidity("");
      }
    }}
  />
</Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="nic">
  <Form.Label>Nic</Form.Label>
  <Form.Control
    value={nic}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
      value = value.slice(0, 12); // Limit the NIC to 12 characters
      setNic(value);
    }}
    required
  />
</Form.Group>


<Form.Group className="mb-3" controlId="phone">
  <Form.Label>Phone Number</Form.Label>
  <Form.Control
    value={phone}
    maxLength="10" // Set the maximum length to 10 characters
    pattern="^\d{10}$" // Validate exactly 10 numeric characters
    required
    onChange={(e) => {
      const numericValue = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
      setphone(numericValue);
    }}
  />
</Form.Group>


<Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}
