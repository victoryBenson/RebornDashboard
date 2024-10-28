import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { DataState, ProductState } from "@/types/interface";
import { RootState } from "@/redux/store";


const initialState: DataState = {
    users: [],
    isLoading: false,
    isError: "",
};  

// getUsers
export const getUsers = createAsyncThunk<ProductState[], void, {state: RootState}>(
    'user/getUsers',
    async(_, thunkAPI) => {
        try {
            return await userService.getUsers()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
              } else {
                console.error("An unknown error occurred");
              }
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder

        // fetchUsers
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled, (state, {payload}:PayloadAction<ProductState[]>) => {
            state.isLoading = false;
            state.users = payload;
        })
        .addCase(getUsers.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = payload;
        })
    },
})

export default userSlice.reducer