import { Box, Button, Grid, Typography } from "@mui/material"
import { RootState, updateBalance } from "../store"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { api } from "../api"


const MoneyValue = (props: {amount: number}) => {
    const user = useSelector((state: RootState) => state.vendingMachine.user);
    const dispatch = useDispatch()

    const handleOnClick = useCallback(() => {
        if (!user) return;
        const syncNewBalance = async () => {
            const newBalance = await api.addBalance(user.username, props.amount)
            dispatch(updateBalance(newBalance.balance))
        }
        syncNewBalance()
    }, [user, dispatch, props.amount])

    return <Grid item xs={4}>
        <Button size="large" variant="contained" onClick={handleOnClick}>{props.amount} €</Button>
    </Grid>
}

export const MoneyInputs = () => {
    const user = useSelector((state: RootState) => state.vendingMachine.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {if(!user) navigate("/")}, [navigate, user])

    const handleRefund = useCallback(() => {
        const syncRefund = async () => {
            if (!user) return;
            await api.refund(user.username);
            dispatch(updateBalance(0));
        }
        syncRefund();
    }, [dispatch, user]);

    return <Box>
        <Typography variant="h4">Add money</Typography>
        <Grid container justifyContent="center" alignItems="center" alignContent="center" spacing={2}>
            <MoneyValue amount={.1}></MoneyValue>
            <MoneyValue amount={.2}></MoneyValue>
            <MoneyValue amount={.5}></MoneyValue>
            <MoneyValue amount={1}></MoneyValue>
            <MoneyValue amount={2}></MoneyValue>
            <MoneyValue amount={5}></MoneyValue>
        </Grid>
        <Typography variant="h5">Balance: {user?.balance} €</Typography>
        <Button size="large" variant="contained" onClick={handleRefund}>Refund</Button>
    </Box>
}