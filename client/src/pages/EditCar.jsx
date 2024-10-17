import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomItem, updateCustomItem, getOptions } from "../services/api";
import "../App.css";

const EditCar = () => {
  const [car, setCar] = useState(null);
  const [options, setOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
    fetchOptions();
  }, [id]);

  useEffect(() => {
    if (car && Object.keys(options).length > 0) {
      calculateTotalPrice();
    }
  }, [car, options]);

  const fetchCar = async () => {
    try {
      const fetchedCar = await getCustomItem(id);
      setCar(fetchedCar);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const fetchOptions = async () => {
    try {
      const fetchedOptions = await getOptions();
      // Remove duplicates
      const uniqueOptions = {
        base_model: Array.from(
          new Set(fetchedOptions.base_model.map((item) => item.name))
        ).map((name) =>
          fetchedOptions.base_model.find((item) => item.name === name)
        ),
        color: Array.from(
          new Set(fetchedOptions.color.map((item) => item.name))
        ).map((name) =>
          fetchedOptions.color.find((item) => item.name === name)
        ),
        wheels: Array.from(
          new Set(fetchedOptions.wheels.map((item) => item.name))
        ).map((name) =>
          fetchedOptions.wheels.find((item) => item.name === name)
        ),
        interior: Array.from(
          new Set(fetchedOptions.interior.map((item) => item.name))
        ).map((name) =>
          fetchedOptions.interior.find((item) => item.name === name)
        ),
      };
      setOptions(uniqueOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const calculateTotalPrice = () => {
    if (!car) return;

    let price = 0;
    if (options.base_model) {
      price +=
        parseFloat(
          options.base_model.find((option) => option.name === car.base_model)
            ?.price
        ) || 0;
    }
    if (options.color) {
      price +=
        parseFloat(
          options.color.find((option) => option.name === car.color)?.price
        ) || 0;
    }
    if (options.wheels) {
      price +=
        parseFloat(
          options.wheels.find((option) => option.name === car.wheels)?.price
        ) || 0;
    }
    if (options.interior) {
      price +=
        parseFloat(
          options.interior.find((option) => option.name === car.interior)?.price
        ) || 0;
    }
    setTotalPrice(price);
  };

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomItem(id, { ...car, price: totalPrice });
      navigate(`/customcars/${id}`);
    } catch (error) {
      console.error("Error updating custom item:", error);
    }
  };

  if (!car || !options.base_model) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Edit {car.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={car.name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Base Model:
          <select
            name="base_model"
            value={car.base_model || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a base model</option>
            {options.base_model?.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Color:
          <select
            name="color"
            value={car.color || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a color</option>
            {options.color?.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Wheels:
          <select
            name="wheels"
            value={car.wheels || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select wheels</option>
            {options.wheels?.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Interior:
          <select
            name="interior"
            value={car.interior || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select interior</option>
            {options.interior?.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <p>
          Total Price: $
          {isNaN(totalPrice) ? "N/A" : Number(totalPrice).toFixed(2)}
        </p>
        <button type="submit">Update Custom Car</button>
      </form>
    </div>
  );
};

export default EditCar;
