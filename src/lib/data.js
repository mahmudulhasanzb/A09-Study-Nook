export const getFeaturedRooms = async () => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiBase}/featured`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Failed to fetch featured rooms: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching featured rooms:', err);
    return [];
  }
};

export const getAllRooms = async (queryParams = {}) => {
  try {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    const queryString = query.toString();
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiBase}/rooms?${queryString}`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Failed to fetch rooms: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching rooms:', err);
    return [];
  }
};

export const getRoomById = async roomId => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiBase}/rooms/${roomId}`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`Failed to fetch room ${roomId}: ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching room ${roomId}:`, err);
    return null;
  }
};
