import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomItem } from "../services/api";
import "../App.css";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const fetchedCar = await getCustomItem(id);
      setCar(fetchedCar);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{car.name} Details</h2>
      <div className="car-details">
        <p>Base Model: {car.base_model}</p>
        <p>Color: {car.color}</p>
        <p>Wheels: {car.wheels}</p>
        <p>Interior: {car.interior}</p>
        <p>Price: ${Number(car.price).toFixed(2)}</p>
      </div>
      <Link to={`/edit/${car.id}`}>Edit</Link>
      <Link to="/customcars">Back to Custom Cars</Link>
    </div>
  );
};

export default CarDetails;
