import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCustomItems, deleteCustomItem } from "../services/api";
import "../App.css";

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const fetchedCars = await getAllCustomItems();
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomItem(id);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="container">
      <h2>Custom Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <h3>{car.name}</h3>
            <p>Base Model: {car.base_model}</p>
            <p>Color: {car.color}</p>
            <p>Price: ${Number(car.price).toFixed(2)}</p>
            <Link to={`/customcars/${car.id}`}>View Details</Link>
            <Link to={`/edit/${car.id}`}>Edit</Link>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
