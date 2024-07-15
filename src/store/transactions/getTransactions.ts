import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getTransaction = createAsyncThunk("transaction/getTransaction", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const response = await axios.get("https://raw.githubusercontent.com/ammar-SoftwareEngineer/CustomerMangement/master/server/db.json")
        return response.data.transactions
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message || error.message)
        } else {
            return rejectWithValue("An unexpected error occurred")
        }
    }
})
export default getTransaction