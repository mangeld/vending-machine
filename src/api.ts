import axios from "axios";
import { UUID } from "crypto";

export interface ApiUser {
    balance: number,
    username: string,
    full_name: string,
    id: UUID,
}

export interface ApiProduct {
    name: string,
    price: number
}

export interface ApiSlot {
    id: UUID,
    quantity: number,
    coordinates: [number, number],
    product: ApiProduct
}

const BASE_URL = "https://ab-vending-machine.vercel.app"

export const api = {
    postLogin: async (username: string): Promise<ApiUser> => {
        const response = await axios.post<ApiUser>(
            `${BASE_URL}/login/`,
            {username: username}
        )
        return {...response.data, balance: Number(response.data.balance)};
    },
    addBalance: async (username: string, amount: number): Promise<{balance: number}> => {
        const response = await axios.post<{balance: number}>(
            `${BASE_URL}/balance/add/`,
            {username, amount}
        );
        return response.data;
    },
    refund: async (username: string): Promise<void> => {
        await axios.post(`${BASE_URL}/balance/refund/`, {username});
    },
    getProducts: async (): Promise<ApiSlot[]> => {
        return (await axios.get(`${BASE_URL}/slots/`)).data;
    },
    buy: async (slotId: UUID, username: string): Promise<{balance: number}> => {
        return (await axios.post(`${BASE_URL}/buy/`, {slot_id: slotId, username})).data
    },
}