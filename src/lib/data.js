export const getAllRooms = async () => {
  const res = await fetch('http://localhost:8000/rooms');
  const allRooms = await res.json();
  return allRooms;
};