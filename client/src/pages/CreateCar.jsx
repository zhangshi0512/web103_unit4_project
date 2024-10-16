import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomItem, getOptions } from "../services/api";
import "../App.css";

const CreateCar = () => {
  const [name, setName] = useState("");
  const [baseModel, setBaseModel] = useState("");
  const [color, setColor] = useState("");
  const [wheels, setWheels] = useState("");
  const [interior, setInterior] = useState("");
  const [options, setOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [baseModel, color, wheels, interior, options]);

  const fetchOptions = async () => {
    try {
      const fetchedOptions = await getOptions();
      setOptions(fetchedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (options.base_model) {
      price +=
        options.base_model.find((option) => option.name === baseModel)?.price ||
        0;
    }
    if (options.color) {
      price +=
        options.color.find((option) => option.name === color)?.price || 0;
    }
    if (options.wheels) {
      price +=
        options.wheels.find((option) => option.name === wheels)?.price || 0;
    }
    if (options.interior) {
      price +=
        options.interior.find((option) => option.name === interior)?.price || 0;
    }
    setTotalPrice(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomItem({
        name,
        base_model: baseModel,
        color,
        wheels,
        interior,
        price: totalPrice,
      });
      navigate("/customcars");
    } catch (error) {
      console.error("Error creating custom item:", error);
    }
  };

  return (
    <div className="container">
      <h2>Create Your Custom Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Base Model:
          <select
            value={baseModel}
            onChange={(e) => setBaseModel(e.target.value)}
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
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
            value={wheels}
            onChange={(e) => setWheels(e.target.value)}
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
            value={interior}
            onChange={(e) => setInterior(e.target.value)}
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
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button type="submit">Create Custom Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
