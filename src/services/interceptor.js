import API from ".";

const interceptor = {
  setupInterceptors: (store) => {
    API.interceptors.response.use(
      (response) => {
        // console.log('interceptors ==>>>',response);
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(response);
        }
      },
      (error) => {
        return Promise.reject(error.response.data);
      }
    );
  },
};

export default interceptor;
