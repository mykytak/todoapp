import "./bootstrap";
import { createApp } from "vue";
import App from "./components/App.vue";

const app = createApp(App);

document.addEventListener('DOMContentLoaded', () => {
    app.mount("#app");
});


