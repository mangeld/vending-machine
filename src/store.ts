import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

interface User {
    username: string,
    balance: number
}

interface VendingMachineState {
    name: string,
    user: User | null,
}

const vendingMachineState: VendingMachineState = {
    name: "",
    user: null,
}

const vendingMachineSlice = createSlice({
    name: 'vendingMachine',
    initialState: vendingMachineState,
    reducers: {
        updateBalance: (state, action: PayloadAction<number>) => {
            if (!state.user) return;
            state.user.balance = action.payload
        },
        setName: (state, action: PayloadAction<string>) => { state.name = action.payload },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
    }
})

export const store = configureStore({
    reducer: {
        vendingMachine: vendingMachineSlice.reducer
    },
})
export const { updateBalance, setName, setUser } = vendingMachineSlice.actions
export type RootState = ReturnType<typeof store.getState>