import { createSlice } from '@reduxjs/toolkit';
export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    inputValues: {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      email: '',
      phone: "+251 ",
      sex: '',
      password1: '',
      password2: '',
      username: '',
    },
    inputErrors: {
      firstNameErr: '',
      middleNameErr: '',
      lastNameErr: '',
      emailErr: '',
      phoneErr: '',
      password1Err: '',
      password2Err: '',
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
    setMiddleName: (state, action) => {
      state.inputValues.MiddleName = action.payload;
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

    setPassword1: (state, action) => {
      state.inputValues.password1 = action.payload;
    },
    setPassword2: (state, action) => {
      state.inputValues.password2 = action.payload;
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
    setMiddleNameErr: (state, action) => {
      state.inputErrors.middleNameErr = action.payload;
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

    setPassword1Err: (state, action) => {
      state.inputErrors.password1Err = action.payload;
    },
    setPassword2Err: (state, action) => {
      state.inputErrors.password2Err = action.payload;
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
