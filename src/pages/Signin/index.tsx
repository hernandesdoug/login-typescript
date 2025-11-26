import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icone from '../../assets/icone.jpg';
import styled from 'styled-components';
import api from "../../services/api";
import {Button} from "antd";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function validateLogin() {
    try {
      const response = await api.post("/login", { email: email, password: password });
      console.log(response.data);
      if (response.status === 200) {
        const id = response.data.id;
        const url = `signon/${id}`;
        window.location.href = url;
      } else {
        console.log("Login Failed!", response.status);
      }
    } catch (error) {
      console.error("Unexpected error!", error);
    }
  }
  return (
    <>
      <Background>
        <Container>
          <Title>
            <img src={Icone} alt="icone empresa" />
            <h1>Welcome back</h1>
            <Texts>Glad to see you again</Texts>
            <Texts>Login to your account below</Texts>
          </Title>
          <Title>
            <br />
            <Label htmlFor="email" >Email</Label>
            <Input type="email" placeholder=" enter email..." id="email"
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder=" enter password..." id="password"
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <BtnLogin variant='solid' onClick={validateLogin}>Login</BtnLogin>
            <br />
            <Texts>Dont have an account? <Link to={"/signup"} className='link-signup'>Sign up for Free</Link></Texts>
          </Title>
        </Container>
      </Background>
    </>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(190, 215, 237);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 500px;
  height: 550px;
  background: #fff;
  border-radius: 1rem;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Texts = styled.p`
  color: #747775; 
`;

const Input = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 0.3rem;
`;

const Label = styled.label`
  position: relative;
  text-align: left;
  width: 400px;
  height: 30px;
  margin-bottom: 0%;
`;

const BtnLogin = styled(Button)`
  width: 400px;
  height: 30px;
  margin-top: 5px;
  border-radius: 0.3rem;
  border: 0.3px solid;
  background-color: rgb(36, 36, 171);
  color: #fff;
`;


export default Signin; 