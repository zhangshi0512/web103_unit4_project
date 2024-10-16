const API_BASE_URL = "/.netlify/functions/api";

export const getAllCustomItems = async () => {
  const response = await fetch(`${API_BASE_URL}/custom-items`);
  if (!response.ok) {
    throw new Error("Failed to fetch custom items");
  }
  return response.json();
};

export const getCustomItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/custom-items/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch custom item");
  }
  return response.json();
};

export const createCustomItem = async (data) => {
  const response = await fetch(`${API_BASE_URL}/custom-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create custom item");
  }
  return response.json();
};

export const updateCustomItem = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/custom-items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update custom item");
  }
  return response.json();
};

export const deleteCustomItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/custom-items/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete custom item");
  }
  return response.json();
};

export const getOptions = async () => {
  const response = await fetch(`${API_BASE_URL}/options`);
  if (!response.ok) {
    throw new Error("Failed to fetch options");
  }
  return response.json();
};
