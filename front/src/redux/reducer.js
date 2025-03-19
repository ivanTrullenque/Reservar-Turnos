import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userActive: {},
    userAppointment:[],
}

export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        userActive: {},
        userAppointment: []
    },
    reducers: {
        addUser: (state, action) => {
            state.userActive = action.payload;
        },
        addUserAppointments: (state, action) => {
            state.userAppointment = action.payload;
        },
        cancelAppointmentAction: (state, action) => {
            state.userAppointment = state.userAppointment.map(appointment => {
                if (appointment.id === action.payload) {
                    return { ...appointment, status: 'Cancelled' };
                }
                return appointment;
            });
        }
    }
});

export const { addUser, addUserAppointments, cancelAppointmentAction } = userSlice.actions;
