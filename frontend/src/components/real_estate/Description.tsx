import React from "react";
import CartIcon from "./Icons/CartIcon";

interface DescriptionProps {
  propertyData: Array;
}

const Description: React.FC<DescriptionProps> = ({ propertyData }) => {
  const handleOrder = () => {
    console.log("ORDERED!!!");
  };

  return (
    <section className="description">
      <p className="pre">{propertyData.category_name}</p>
      <p className="pre">{propertyData.status}</p>
      {propertyData.bestseller && <p className="bestseller-tag">Bestseller</p>}
      {propertyData.bestseller && <p className="bestseller-tag">Bestseller</p>}
      <h1>{propertyData.title}</h1>
      <p className="desc">
        {propertyData.address_country}, {propertyData.address_city}{" "}
        {propertyData.address_zip_code}, {propertyData.address_street}{" "}
        {propertyData.address_apartment}
      </p>
      <p className="desc">{propertyData.description} Powstał w {propertyData.year_of_construction} r.</p>
      <p className="pre">Ocena: {propertyData.total_rates}/5</p>
      {propertyData.elevator && <p className="pre">Winda</p>}
      <p className="pre">Liczba pięter: {propertyData.no_of_floors}</p>
      <p className="pre">Liczba pokoi: {propertyData.no_of_rooms}</p>
      <p className="pre">Metraż: {propertyData.square_footage} m²</p>
      {propertyData.parking_space && (
        <p className="pre">
          Miejsce do parkowania: {propertyData.parking_space}
        </p>
      )}
      <div className="price">
        <div className="main-tag">
          <p>{propertyData.price} zł</p>
        </div>
      </div>
      <div className="buttons">
        <button
          className="add-to-cart"
          onClick={() => {
            handleOrder();
          }}
        >
          <CartIcon />
          Zarezerwuj
        </button>
      </div>
      <p className="desc">
        ...lub skontaktuj się z {propertyData.broker_first_name}{" "}
        {propertyData.broker_first_surname} przez tel.{" "}
        {propertyData.broker_phone_number}{" "}
      </p>
    </section>
  );
};

export default Description;
