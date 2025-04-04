// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userReducer';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage
// import { combineReducers } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";

// // تكوين redux-persist
// const persistConfig = {
//   key: "root",
//   storage,
// };

// // دمج جميع reducers
// const rootReducer = combineReducers({
//   reducer: {
//   user: userReducer,
// },
// });

// // إنشاء reducer مع القدرة على الحفظ
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // إنشاء store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // تعطيل التحقق من التسلسل بسبب redux-persist
//     }),
// });

// // إنشاء persistor
// export const persistor = persistStore(store);

