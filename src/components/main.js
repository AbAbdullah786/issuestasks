import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import router from "./router";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import api from "./api";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";
import ErrorIcon from "./components/ToastIcons/ErrorIcon";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue } from 'bootstrap-vue';

const app = createApp(App);

app.use(BootstrapVue);
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  },
});
app.mount("#app");
library.add(faFacebook);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer" + " " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          localStorage.clear();
          router.replace({
            path: "/auth/login",
          });
          break;
        case 404:
          alert("page not exist");
          break;
        case 500:
          createToast();
          break;
        case 502:
          setTimeout(() => {
            router.replace({
              path: "/auth/login",
            });
          }, 300);
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

function createToast() {
  const toast = useToast();
  toast("Internal Server Error", {
    position: "top-right",
    timeout: 4025,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: false,
    icon: ErrorIcon,
    rtl: false,
  });
}
