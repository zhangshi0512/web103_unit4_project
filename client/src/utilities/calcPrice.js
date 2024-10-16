export const calculatePrice = (features) => {
  // Calculate total price based on features selected
  return features.reduce((total, feature) => total + (feature.price || 0), 0);
};
