import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "../styles/real_estate_page.css";
import { Container } from "@mui/material";
import Description from "../components/real_estate/Description";
import Gallery from "../components/real_estate/Gallery";

interface PropertyDataInterface {
  id: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  category: string;
  title: string;
  price: number;
  description: string;
  status: string;
  rating: number;
  size: number;
  addressCountry: string;
  addressCity: string;
  addressStreet: string;
  addressAppartment: string;
  addressZipCode: string;
  numberOfRooms: number;
  numberOfFloors: number;
  yearOfConstruction: number;
  parking: string;
  elevator: boolean;
  squareFootage: number;
  bestSeller: boolean;
  brokerName: string;
  brokerSurname: string;
  brokerPhone: string;
}

interface ResponseDataInterface extends PropertyDataInterface {
  data: PropertyDataInterface;
}

const RealEstatePage = () => {
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState(undefined as string | undefined);
  const [propertyData, setPropertyData] = useState({} as PropertyDataInterface);

  const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get("id");
    if (propertyId) {
      setPropertyId(propertyId);
    }
  };

  const init = () => {
    if (propertyId) {
      axios({
        method: "GET",
        url: `http://localhost:3001/real-estate/getForDataInterfaceById/${propertyId}`,
        data: { id: propertyId },
      })
        .then((res: AxiosResponse<ResponseDataInterface>) => {
          const data = res.data;
          // console.log(data);
          setPropertyData(data);
          setLoading(false);
        })
        .catch((err: AxiosError) => {
          console.log("Error", err);
        });
    }
  };

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    init();
  }, [propertyId]);

  if (loading) {
    return (
      <div
        className="page"
        style={{
          maxWidth: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <main className="RealEstatePage">
        <Container component="section" maxWidth={"lg"}>
          <section className="core">
            <Gallery />
            <Description propertyData={propertyData} />
          </section>
        </Container>
      </main>
    </div>
  );
};

export default RealEstatePage;
