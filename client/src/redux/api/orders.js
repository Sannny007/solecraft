import API from '../api/axios';

export const createOrder = async (orderData, token) => {
  const res = await API.post('/orders', orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const getMyOrders = async (token) => {
  const res = await API.get('/orders/my-orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};