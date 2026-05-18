export const getFeaturedRooms = async () => {
  const res = await fetch('http://localhost:8000/featured');
  const data = await res.json();
  return data;
};

export const getAllRooms = async () => {
  const res = await fetch('http://localhost:8000/rooms');
  const data = await res.json();
  return data;
};
