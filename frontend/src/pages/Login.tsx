import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const LoginRegisterPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    country: '',
    city: '',
    street: '',
    zipCode: '',
    apartmentNum: '',
    firstName: '',
    secondName: '',
    firstSurname: '',
    secondSurname: '',
    email: '',
    password: '',
    phoneNumber: '',
    nip: '',
    active: true,
    createdAt: new Date().toISOString(),
    role: "USER"
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Wysyłanie danych logowania na backend
    console.log('Logowanie:', loginData);
    try {
      const response = await axios.post('http://localhost:3001/user/login', loginData);

      if (response.status === 200) {
        console.log('Logowanie udane!', response.data);
        window.location.href = '/';
      } else {
        console.log('Błąd podczas logowania:', response.data);
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania danych logowania:', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    console.log('Rejestracja:', registerData);
    try {
      const response = await axios.post('http://localhost:3001/user/register', registerData);

      if (response.status === 200) {
        console.log('Rejestracja udana!', response.data);
        window.location.href = '/';
      } else {
        console.log('Błąd podczas rejestracji:', response.data);
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania danych rejestracji:', error);
    }
  };

  return (
    <LoginRegisterWrapper>
      <LoginRegisterForm>
        <FormHeader>Logowanie</FormHeader>
        <Form onSubmit={handleLoginSubmit}>
          <Label>Email:</Label>
          <Input
            type="text"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />

          <Label>Hasło:</Label>
          <Input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />

          <Button type="submit">Zaloguj</Button>
        </Form>
      </LoginRegisterForm>

      <LoginRegisterForm>
        <FormHeader>Rejestracja</FormHeader>
        <Form onSubmit={handleRegisterSubmit}>
          <Label>Kraj:</Label>
          <Input
            type="text"
            value={registerData.country}
            onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
          />

          <Label>Miasto:</Label>
          <Input
            type="text"
            value={registerData.city}
            onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
          />

          <Label>Ulica:</Label>
          <Input
            type="text"
            value={registerData.street}
            onChange={(e) => setRegisterData({ ...registerData, street: e.target.value })}
          />

          <Label>Kod pocztowy:</Label>
          <Input
            type="text"
            value={registerData.zipCode}
            onChange={(e) => setRegisterData({ ...registerData, zipCode: e.target.value })}
          />

          <Label>Numer mieszkania:</Label>
          <Input
            type="text"
            value={registerData.apartmentNum}
            onChange={(e) => setRegisterData({ ...registerData, apartmentNum: e.target.value })}
          />

          <Label>Imię:</Label>
          <Input
            type="text"
            value={registerData.firstName}
            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
          />

          <Label>Drugie imię:</Label>
          <Input
            type="text"
            value={registerData.secondName}
            onChange={(e) => setRegisterData({ ...registerData, secondName: e.target.value })}
          />

          <Label>Nazwisko:</Label>
          <Input
            type="text"
            value={registerData.firstSurname}
            onChange={(e) => setRegisterData({ ...registerData, firstSurname: e.target.value })}
          />

          <Label>Drugie nazwisko:</Label>
          <Input
            type="text"
            value={registerData.secondSurname}
            onChange={(e) => setRegisterData({ ...registerData, secondSurname: e.target.value })}
          />

          <Label>Email:</Label>
          <Input
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />

          <Label>Hasło:</Label>
          <Input
            type="password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />

          <Label>Numer telefonu:</Label>
          <Input
            type="text"
            value={registerData.phoneNumber}
            onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
          />

          <Label>NIP (opcjonalny):</Label>
          <Input
            type="text"
            value={registerData.nip}
            onChange={(e) => setRegisterData({ ...registerData, nip: e.target.value })}
          />

          <Button type="submit">Zarejestruj</Button>
          <RegistrationText>
            Zarejestruj się i dołącz do naszej społeczności! Odkryj pełen zakres naszych usług i możliwości.
          </RegistrationText>
        </Form>
      </LoginRegisterForm>
    </LoginRegisterWrapper>
  );
};

const LoginRegisterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const LoginRegisterForm = styled.div`
  width: 45%;
`;

const FormHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const RegistrationText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: #555;
  text-align: center;
`;

export default LoginRegisterPage;
