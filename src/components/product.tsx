import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Box from '@mui/material/Button'
import { UUID } from 'crypto'
import { ApiProduct } from '../api'


export const Product = (props: {product: ApiProduct, onBuy: (product: ApiProduct) => void | undefined}) => {
    return (
        <Card>
            <CardContent>
                <Grid>
                    <Typography variant="h5">{props.product.name}</Typography>
                    <Typography>Price: {props.product.price} €</Typography>
                    <Button
                        variant="contained"
                        sx={{ m: 2, width: "80%" }}
                        onClick={ () => props.onBuy(props.product) }
                    >Buy</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}