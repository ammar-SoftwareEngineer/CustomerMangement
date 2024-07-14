import { createSlice } from '@reduxjs/toolkit';
import getTransaction from './getTransactions';
interface TransactionsState {
    records: { id: number, customer_id: number, date: string, amount: number }[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
}

const initialState: TransactionsState = {
    records: [],
    loading: 'idle',
    error: null,
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(getTransaction.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        }).addCase(getTransaction.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        }).addCase(getTransaction.rejected, (state, action) => {
            state.loading = 'failed';
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })
    }
})

export default transactionsSlice.reducer;
export type { TransactionsState }