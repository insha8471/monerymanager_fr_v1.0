// export const BASE_URL = "https://monerymanager-api-1.onrender.com/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";

// cloudinary url
const CLOUDINARY_CLOUD_NAME = "dsnxwhii2";



export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    GET_ALL_INCOMES: "/incomes",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
    ADD_INCOME : "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}