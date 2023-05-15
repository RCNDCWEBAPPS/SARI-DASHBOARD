
import { createSlice } from '@reduxjs/toolkit';
export const ranchSlice = createSlice({
  name: 'rance',
  initialState: {
       products: [],
    inputValues: {
      Name: '',
    location: '',
      area: '',
      distanse: '',
    },
    inputErrors: {
    NameErr: '',
  locationErr: '',
      areaErr: '',
      distanceErr: '',
    },
    isLoading: false,
    registrationSuccessful: false,
  },
  reducers: {
    setName: (state, action) => {
      state.inputValues.Name = action.payload;
    },
    setlocation: (state, action) => {
      state.inputValues.location = action.payload;
    },
    setArea: (state, action) => {
      state.inputValues.area = action.payload;
    },
    setDiatance: (state, action) => {
      state.inputValues.distanse = action.payload;
    },
    setNameErr: (state, action) => {
      state.inputErrors.NameErr = action.payload;
    },
    setLocationErr: (state, action) => {
      state.inputErrors.locationErr = action.payload;
    },
    setDistanceErr: (state, action) => {
      state.inputErrors.distanceErr = action.payload;
    },
    setAreaErr: (state, action) => {
      state.inputErrors.areaErr = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRegistrationSuccessful: (state, action) => {
      state.registrationSuccessful = action.payload;
    },
      setRanchs: (state, action) => {
      state.products = action.payload;
    },
  },
});
