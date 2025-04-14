import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/", name: "home", component: () => import("@/layout.vue"),
            children: [
                {
                    path: "/register", name: "newRegister", component: () => import("@/modules/registerMembers.vue"),
                    meta: { label: "Nueva Inscripción", icon: IconSolarClipboardAddBold }
                },
                {
                    path: "/inscriptions", name: "inscriptions", component: () => import("../views/AboutView.vue"),
                    meta: { label: "Inscripciones", icon: IconTablerClipboardDataFilled }
                },
                {
                    path: "/users", name: "users", component: () => import("../views/AboutView.vue"),
                    meta: { label: "Usuarios", icon: IconSolarUsersGroupRoundedBold }
                },
                {
                    path: "/assistance", name: "assistance", component: () => import("../views/AboutView.vue"),
                    meta: { label: "Asistencia", icon: IconMaterialSymbolsCalendarAppsScript }
                }
            ]
        }
    ]
});

export default router;
