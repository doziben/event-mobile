import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { DevSettings } from "react-native";

export async function saveToken(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export async function deleteToken(key) {
  const result = await SecureStore.deleteItemAsync(key);
  return result;
}

export const apiUrl = "http://64.225.103.179:4000"; //"https://api.yeve.co.uk";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (req) => {
    const accessToken = await getToken("_accessToken");
    const refreshToken = await getToken("_refreshToken");

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;

      //decode token and compare expiry date
      // const decodedUser = jwt_decode(accessToken);
      // const isExpiredToken = dayjs.unix(decodedUser.exp).diff(dayjs()) < 1;

      // const response = await axios.get(
      //   `${apiUrl}/users/refresh`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${refreshToken}`,
      //     },
      //   }
      // );

      // //store new token
      // saveToken("_accessToken", response.data.accessToken);
      // saveToken("_refreshToken", response.data.refreshToken);
      // req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

const refreshAccessToken = async (failedRequest) => {
  console.log("refreshing");
  const refreshToken = await getToken("_refreshToken");
  if (!refreshToken) {
    console.log("No refresh token found");
    //redirect user to login
    // DevSettings.reload("UnAuthorized");
    return Promise.reject(failedRequest);
  }

  console.log("res init");
  const response = await axios.get(`${apiUrl}/auth/refresh`, {
    skipAuthRefresh: true,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.status !== 200) {
    console.log("Refresh token failed");
  }
  await Promise.all([
    saveToken("_accessToken", response.data.accessToken),
    saveToken("_refreshToken", response.data.refreshToken),
  ]);
  failedRequest.response.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return Promise.resolve();
};

createAuthRefreshInterceptor(api, refreshAccessToken, {
  statusCodes: [401, 403],
});

export default api;

// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { DevSettings } from "react-native";

// export async function saveToken(key, value) {
//   await SecureStore.setItemAsync(key, value);
// }

// export async function getToken(key) {
//   const result = await SecureStore.getItemAsync(key);
//   return result;
// }

// export async function deleteToken(key) {
//   const result = await SecureStore.deleteItemAsync(key);
//   return result;
// }

// const apiUrl = "https://api.yeve.co.uk";

// const api = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     accept: "*/*",
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   async (req) => {
//     const accessToken = await getToken("_accessToken");
//     const refreshToken = await getToken("_refreshToken");

//     if (!accessToken || !refreshToken) {
//       //send user back
//       console.log("No Token");
//     }

//     const decodedUser = jwt_decode(accessToken);
//     const isExpiredToken = dayjs.unix(decodedUser.exp).diff(dayjs()) < 1;
//     if (isExpiredToken) token = await refreshAccessToken(refreshToken);

//     if (!isExpiredToken) return req;

//     const response = await axios.get(`${apiUrl}/auth/refresh`, {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });
//     if (response.status !== 200) {
//       console.log("Refresh token failed");
//     }
//     await Promise.all([
//       saveToken("_accessToken", response.data.accessToken),
//       saveToken("_refreshToken", response.data.refreshToken),
//     ]);

//     req.headers.Authorization = `Bearer ${response.data.accessToken}`;
//     return req;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// const refreshAccessToken = async (refreshToken) => {
//   if (!refreshToken) {
//     return;
//   }
//   const response = await axios.get(`${apiUrl}/auth/refresh`, {
//     skipAuthRefresh: true,
//     headers: {
//       Authorization: `Bearer ${refreshToken}`,
//     },
//   });
//   if (response.status !== 200) {
//     console.log("Refresh token failed");
//   }
//   await Promise.all([
//     saveToken("_accessToken", response.data.accessToken),
//     saveToken("_refreshToken", response.data.refreshToken),
//   ]);

//   return response.data.accessToken;
// };

// export default api;
