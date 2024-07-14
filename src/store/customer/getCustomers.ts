import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCustomers = createAsyncThunk("customers/getCustomers", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const response = await axios.get("http://localhost:3000/customers")
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("")
        }
    }
});

export default getCustomers;