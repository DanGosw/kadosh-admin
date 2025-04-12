import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", name: "home", component: () => import("@/layout.vue") },
        { path: "/register", name: "register", component: () => import("../views/AboutView.vue") },
        { path: "/inscriptions", name: "inscriptions", component: () => import("../views/AboutView.vue") },
        { path: "/users", name: "users", component: () => import("../views/AboutView.vue") },
        { path: "/assistance", name: "assistance", component: () => import("../views/AboutView.vue") }
    ]
});

export default router;
