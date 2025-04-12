import router from "@/router/index";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

interface RouteMeta {
    label?: string;
    icon?: string;
}

interface Option {
    label?: string;
    key: string;
    active: string;
    path?: string;
    route?: string;
    meta: RouteMeta;
    icon?: string;
    visible: boolean;
    items?: Option[];
    expand?: boolean;
}

const navBarStore = defineStore("optionsMenu", {
    state: () => ({ options: [] as Option[] }),
    actions: {
        async createOptionsMenu(): Promise<void> {
            const routerViews: RouteRecordRaw[] = router.resolve({ name: "home" })?.matched[0].children || [];
            this.options = this.processRoutes(routerViews);
        },
        processRoutes(routes: RouteRecordRaw[]): Option[] {
            return routes.reduce((processedRoutes: Option[], route: RouteRecordRaw) => {
                if (route.meta && "label" in route.meta) {
                    const processedRoute: Option | null = this.valuesRoutesMenu(route);
                    if (processedRoute) {
                        processedRoutes.push(processedRoute);
                    }
                }
                return processedRoutes;
            }, []);
        },
        valuesRoutesMenu(route: RouteRecordRaw): Option | null {
            if (route.meta && "label" in route.meta) {
                const meta = route.meta as RouteMeta;
                const objOption: Option = {
                    label: meta.label,
                    key: route.name as string,
                    active: route.name as string,
                    path: route.path,
                    route: route.path,
                    meta: meta as RouteMeta,
                    icon: meta.icon,
                    visible: true
                };

                if (route.children) {
                    delete objOption.path;
                    delete objOption.route;
                    objOption.items = this.processRoutes(route.children);
                    objOption.expand = false;
                    if (objOption.items.length) {
                        return objOption;
                    }
                } else {
                    return objOption;
                }
            }
            return null;
        }

    }
});

export const optionsMenuStore = navBarStore();
