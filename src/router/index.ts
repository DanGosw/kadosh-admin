import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/", name: "home", component: () => import("@/layout.vue"),
            children: [
                {
                    path: "/register", name: "newRegister", component: () => import("@/modules/registers/registersCard.vue"),
                    meta: { label: "Nueva Inscripción", icon: IconSolarClipboardAddBold }
                },
                {
                    path: "/inscriptions", name: "inscriptions", component: () => import("../views/AboutView.vue"),
                    meta: {
                        label: "Inscripciones", icon: IconTablerClipboardDataFilled,
                        permissions: [
                            { name: "XD" }
                        ]
                    }
                },
                {
                    path: "/users", name: "users", component: () => import("../views/AboutView.vue"),
                    meta: {
                        label: "Usuarios", icon: IconSolarUsersGroupRoundedBold,
                        permissions: [
                            { name: "XD2" }
                        ]
                    }
                },
                {
                    path: "/assistance", name: "assistance", component: () => import("../views/AboutView.vue"),
                    meta: {
                        label: "Asistencia", icon: IconMaterialSymbolsCalendarAppsScript,
                        permissions: [
                            { name: "XD3" }
                        ]
                    }
                }
            ]
        }
    ]
});

export default router;
