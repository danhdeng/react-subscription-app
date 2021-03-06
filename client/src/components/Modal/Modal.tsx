import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
interface ModalProps {
  text: string;
  variant: 'primary' | 'secondary' | 'danger';
  isSignupFlow: boolean;
}

const ErrorComponent = styled.p`
  color: red;
`;

export const ModalComponent = ({ text, variant, isSignupFlow }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);
  const submitHanlder = async () => {
    setErrorMsg('');
    let response;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          email,
          password,
        }
      );
      response = signUpData;
    } else {
      const { data: loginData } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      response = loginData;
    }
    if (response?.errors.length) {
      const errMsg = response?.errors.map(function (item: any, i: number) {
        return <li key={i}>{item.msg}</li>;
      });
      setErrorMsg(errMsg);
    }
    localStorage.setItem('react_sub_token', response?.data?.token);
    setState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
        stripeCustomerId: response.data.user.stripeCustomerId,
      },
      loading: false,
      error: null,
    });
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common[
      'authorization'
    ] = `Bearer ${response.data.token}`;
    navigate('/articles');
  };
  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: '1rem', padding: '0.5rem 3rem' }}
      >
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorComponent>{errorMsg}</ErrorComponent>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitHanlder}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
