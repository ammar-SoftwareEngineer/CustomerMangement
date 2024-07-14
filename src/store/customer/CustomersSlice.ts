import { createSlice } from "@reduxjs/toolkit";
import getCustomers from "./getCustomers";
interface CustomerState {
    records: { id: number, name: string }[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
}
const initialState: CustomerState = {
    records: []
    , loading: "idle",
    error: null
}

const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCustomers.pending, (state) => {
            state.loading = "pending";
            state.error = null
        }).addCase(getCustomers.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload
        }).addCase(getCustomers.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload
            }
        })
    }
})

export default customersSlice.reducer
export type { CustomerState };