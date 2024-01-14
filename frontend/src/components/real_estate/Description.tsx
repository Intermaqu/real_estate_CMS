import React from "react";
import CartIcon from "./Icons/CartIcon";

interface DescriptionProps {}

const Description: React.FC<DescriptionProps> = ({}) => {
  const handleOrder = () => {
    console.log("ORDERED!!!");
  };

  return (
    <section className="description">
      <p className="pre">sneaker company</p>
      <h1>fall limited edition sneakers</h1>
      <p className="desc">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they'll withstand everything the
        weather can offer
      </p>
      <div className="price">
        <div className="main-tag">
          <p>$125.00</p>
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
          Order
        </button>
      </div>
    </section>
  );
};

export default Description;
