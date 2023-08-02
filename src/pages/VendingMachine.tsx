import { Navigate } from "react-router";
import { Products } from "../components/products";
import { Container, Grid } from "@mui/material";
import { MoneyInputs } from "../components/moneyInputs";

export const VendingMachine = () => {
    return <Grid container>
        <Grid container item xs={6}><Products /></Grid>
        <Grid container item xs={6}><MoneyInputs /></Grid>
    </Grid>
}