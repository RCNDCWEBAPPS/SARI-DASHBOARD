import { createSlice } from '@reduxjs/toolkit';
export const ranchManagerSlice = createSlice({
  name: 'ranchManager',
  initialState: {
    inputValues: {
      FirstName: '',
      LastName: '',
      email: '',
      phone: "+251 ",
      sex: '',
      password: '',
      username: '',
      role:"ranchManager"
    },
    inputErrors: {
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      phoneErr: '',
      passwordErr: '',
      sexErr: '',
      userNameErr: '',
 
    },
    isLoading: false,
    registrationSuccessful: false,
  },
  reducers: {
    setFirstName: (state, action) => {
      state.inputValues.FirstName = action.payload;
    },
  
    setLastName: (state, action) => {
      state.inputValues.LastName = action.payload;
    },
    setEmail: (state, action) => {
      state.inputValues.email = action.payload;
    },
    setPhone: (state, action) => {
      state.inputValues.phone = action.payload;
    },

    setPassword: (state, action) => {
      state.inputValues.password = action.payload;
    },
    setUserName: (state, action) => {
      state.inputValues.username = action.payload;
    },
    setSex: (state, action) => {
      state.inputValues.sex = action.payload;
    },
    setFirstNameErr: (state, action) => {
      state.inputErrors.firstNameErr = action.payload;
    },
  
    setLastNameErr: (state, action) => {
      state.inputErrors.lastNameErr = action.payload;
    },
    setEmailErr: (state, action) => {
      state.inputErrors.emailErr = action.payload;
    },
    setPhoneErr: (state, action) => {
      state.inputErrors.phoneErr = action.payload;
    },

    setPasswordErr: (state, action) => {
      state.inputErrors.passwordErr = action.payload;
    },
  
    setUserNameErr: (state, action) => {
      state.inputErrors.userNameErr = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRegistrationSuccessful: (state, action) => {
      state.registrationSuccessful = action.payload;
    },
  },
});
