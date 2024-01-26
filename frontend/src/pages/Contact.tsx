import React from 'react';
import styled from 'styled-components';

const ContactPage = () => {
  return (
    <ContactWrapper>
      <Header>Skontaktuj się z nami</Header>
      <Text>
        Jesteśmy dostępni od poniedziałku do piątku, w godzinach 9:00-17:00. Skorzystaj z poniższych danych kontaktowych lub wypełnij formularz, a skontaktujemy się z Tobą najszybciej, jak to możliwe.
      </Text>

      <ContactInfo>
        <Subheader>Informacje Kontaktowe</Subheader>
        <p>
          Email: info@nasza-firma-nieruchomosci.pl
          <br />
          Telefon: +48 123 456 789
          <br />
          Adres: ul. Przykładowa 123, 00-000 Warszawa
        </p>
      </ContactInfo>

      {/* <ContactForm>
        <Label>Imię i Nazwisko</Label>
        <Input type="text" placeholder="Wpisz swoje imię i nazwisko" />

        <Label>Email</Label>
        <Input type="email" placeholder="Wpisz swój adres email" />

        <Label>Wiadomość</Label>
        <Textarea placeholder="Napisz swoją wiadomość"></Textarea>

        <Button type="submit">Wyślij</Button>
      </ContactForm> */}
    </ContactWrapper>
  );
};

const ContactWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
`;

const Subheader = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
`;

const ContactForm = styled.form`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ContactPage;
