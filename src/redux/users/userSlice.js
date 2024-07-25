import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
    name:"userSlice",
    initialState: {
        userData: "Ananthu"
    }
})

export default userSlice.reducer;