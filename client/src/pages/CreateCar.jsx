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

      // Filter out duplicates
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
    let price = 0;

    if (options.base_model && baseModel) {
      const baseModelOption = options.base_model.find(
        (option) => option.name === baseModel
      );
      price += baseModelOption ? parseFloat(baseModelOption.price) || 0 : 0;
    }

    if (options.color && color) {
      const colorOption = options.color.find((option) => option.name === color);
      price += colorOption ? parseFloat(colorOption.price) || 0 : 0;
    }

    if (options.wheels && wheels) {
      const wheelsOption = options.wheels.find(
        (option) => option.name === wheels
      );
      price += wheelsOption ? parseFloat(wheelsOption.price) || 0 : 0;
    }

    if (options.interior && interior) {
      const interiorOption = options.interior.find(
        (option) => option.name === interior
      );
      price += interiorOption ? parseFloat(interiorOption.price) || 0 : 0;
    }

    setTotalPrice(Number(price));
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
        <p>
          Total Price: $
          {isNaN(totalPrice) ? "N/A" : Number(totalPrice).toFixed(2)}
        </p>
        <button type="submit">Create Custom Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
