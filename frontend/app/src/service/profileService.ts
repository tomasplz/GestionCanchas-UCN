const API_URL = 'http://localhost:3000/api/v1/auth';

export const getUserCards = async (token: string) => {
    const res = await fetch(`${API_URL}/user/cards`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener tarjetas');
    return data;
};

export const addUserCard = async (token: string, cardData: any) => {
    const res = await fetch(`${API_URL}/user/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cardData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al agregar tarjeta');
    return data;
};

export const topUpBalance = async (token: string, amount: number, cardId: string) => {
    const res = await fetch(`${API_URL}/user/topup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, cardId })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al recargar saldo');
    return data;
};

export const getUserReservations = async (token: string) => {
    const res = await fetch(`${API_URL}/reservations`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener reservaciones');
    return data;
};