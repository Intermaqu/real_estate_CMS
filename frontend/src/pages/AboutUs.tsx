import React from 'react';
import styled from 'styled-components';

const AboutUs = () => {
  return (
    <AboutUsWrapper>
      <Header>Kim Jesteśmy</Header>
      <Text>
        Jesteśmy dynamiczną firmą specjalizującą się w handlu nieruchomościami na rynku lokalnym i międzynarodowym. Nasza firma powstała z pasji do nieruchomości oraz z myślą o dostarczaniu najlepszych usług naszym klientom.
      </Text>

      <Header>Nasza Misja</Header>
      <Text>
        Naszą misją jest pomagać naszym klientom osiągnąć ich cele związane z nieruchomościami. Bez względu na to, czy planują Państwo zakup swojego pierwszego mieszkania, sprzedaż obecnej nieruchomości, czy też inwestycję w rynek nieruchomości, jesteśmy tutaj, aby wspierać i doradzać na każdym etapie procesu.
      </Text>

      <Header>Nasze Usługi</Header>
      <Text>
        Oferujemy szeroki zakres usług obejmujący zarówno nieruchomości mieszkaniowe, jak i komercyjne. Nasz doświadczony zespół agentów nieruchomości jest gotów sprostać różnorodnym potrzebom klientów, zapewniając profesjonalizm, rzetelność i pełne zaangażowanie w każde zlecenie.
      </Text>

      <Header>Dlaczego My</Header>
      <Text>
        Wybierając naszą firmę, wybierasz partnera, który dba o Twoje interesy. Nasza wiedza, doświadczenie i zrozumienie rynku nieruchomości pozwalają nam świadczyć usługi na najwyższym poziomie. Kładziemy nacisk na uczciwość, transparentność i satysfakcję klienta.
      </Text>

      <ContactHeader>Kontakt</ContactHeader>
      <Text>
        Email: info@nasza-firma-nieruchomosci.pl
        <br />
        Telefon: +48 123 456 789
        <br />
        Adres: ul. Przykładowa 123, 00-000 Warszawa
      </Text>
    </AboutUsWrapper>
  );
};

const AboutUsWrapper = styled.div`
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

const ContactHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

export default AboutUs;
