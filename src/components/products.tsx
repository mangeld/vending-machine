import Box from '@mui/material/Button'

import { Product } from "./product"
import { Container, Grid, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react';
import { ApiProduct, ApiSlot, ApiUser, api } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateBalance } from '../store';
import axios, { AxiosError } from 'axios';

export const Products = () => {
    const [slots, setSlots] = useState<ApiSlot[]>([]);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.vendingMachine.user);
    useEffect(() => {
        const fetchProducts = async () => {
            const apiSlots = await api.getProducts();
            setSlots(apiSlots);
        }
        fetchProducts();
    }, []);

    const handlePurchase = useCallback((slot: ApiSlot) => {
        if (!user) return;
        const postBalance = async (slot: ApiSlot, username: string) => {
            try {
                const newBalance = await api.buy(slot.id, username);
                dispatch(updateBalance(newBalance.balance));
            } catch(error) {
                if (axios.isAxiosError(error)) {
                    alert(error.response?.data.error)
                }
            }
        }
        postBalance(slot, user.username);
    }, [dispatch, user]);

    return (
        <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
            { slots.map(slot => {
                return <Grid key={slot.id} item xs={4}>
                    <Product product={slot.product} onBuy={ () => handlePurchase(slot) } />
                </Grid>
            }) }
        </Grid>
    )
}

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
