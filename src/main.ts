import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router"; // Import the router
import "./index.css";

const app = createApp(App);
app.use(router); // Use the router

document.documentElement.classList.add("dark");
app.mount("#app");
