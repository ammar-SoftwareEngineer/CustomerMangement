import {configureStore} from '@reduxjs/toolkit';
import customersReducer from './customer/CustomersSlice';
import transactionsReducer from './transactions/TransactionsSlice';
export const store=configureStore({
    reducer:{
        customers:customersReducer,  
        transactions:transactionsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch