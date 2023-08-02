import { Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { api } from "../api"
import { setUser } from "../store"


export const Login = () => {
    let [username, setUsername] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let loginHandler = useCallback(async () => {
        const user = await api.postLogin(username);
        dispatch(setUser({username: user.username, balance: user.balance}));
        setUsername("");
        navigate("/vending-machine");
    }, [username, dispatch, navigate]);

    return <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                direction="column"
                spacing={4}
                padding={2}>
        <Grid item>
            <Typography variant="h3">Login</Typography>
        </Grid>
        <Grid item>
            <TextField
                variant="outlined"
                label="Username"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
        </Grid>
        <Grid item>
            <Button
                variant="contained"
                size="large"
                onClick={() => loginHandler()}>Login
            </Button>
        </Grid>
    </Grid>
}