<script setup lang="ts">
import type { InterfaceMembers } from "@/composables/interfaceMembers";
import { useMembersStore } from "@/stores/storeMembers.ts";
import { isValid, parseISO, format } from "date-fns";

const membersStoreOptions = useMembersStore();

const props = withDefaults(defineProps<InterfaceMembers>(), {
    dni: "",
    names: "",
    lastnames: "",
    gender: "",
    birthdate: null,
    phone: "",
    isMember: "",
    church: "",
    docType: ""
});

const convertDate = (data: Date | Date[] | (Date | null)[] | null | string | undefined) => {
    let date: Date | null = null;

    if (typeof data === "string") {
        const parsed = parseISO(data);
        date = isValid(parsed) ? parsed : null;
    } else if (data instanceof Date) {
        date = isValid(data) ? data : null;
    }
    return date ? format(date, "dd-MM-yyyy") : null;
};

</script>

<template>
    <div class="rounded-lg shadow-md p-4 bg-white dark:bg-surface-800 relative w-full max-w-sm border dark:border-surface-700">
        <!-- DNI y ícono delete -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
            <div class="flex items-center gap-1">
                <i-material-symbols-id-card-outline-rounded class="text-base"/>
                <span>{{ props.dni }}</span>
            </div>
            <Button v-tooltip.left="'Eliminar de la lista'" size="small" severity="danger"
                    @click="membersStoreOptions.removeMembers(props)">
                <template #icon>
                    <i-material-symbols-delete-outline-rounded class="text-lg"/>
                </template>
            </Button>
        </div>

        <!-- Nombre -->
        <h2 class="font-bold text-surface-900 dark:text-white text-base mt-1">
            {{ props.names }} {{ props.lastnames }}
        </h2>

        <!-- Género y Fecha -->
        <div class="flex justify-between items-center mt-1 text-sm">
            <div class="flex items-center gap-1 text-primary-500">
                <i-material-symbols-male-rounded class="text-base" v-if="props.gender === 'M'"/>
                <i-material-symbols-female-rounded class="text-base" v-else/>
                <span class="text-surface-700 dark:text-surface-200">{{ props.gender === "M" ? "MASCULINO" : "FEMENINO" }}</span>
            </div>
            <div class="flex items-center gap-1 text-gray-500 dark:text-gray-300">
                <i-material-symbols-calendar-month-outline-rounded class="text-base"/>
                <span>{{ convertDate(props.birthdate) }}</span>
            </div>
        </div>

        <!-- Teléfono y Estado -->
        <div class="flex justify-between items-center mt-1 text-sm">
            <div class="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                <i-material-symbols-call class="text-base"/>
                <span>{{ props.phone }}</span>
            </div>
            <span class="text-primary-500 font-medium">{{ props.isMember }}</span>
        </div>

        <!-- Iglesia -->
        <div class="flex items-center gap-1 mt-1 text-sm text-gray-700 dark:text-gray-200">
            <i-material-symbols-church-rounded class="text-base"/>
            <span>{{ props.church }}</span>
        </div>
    </div>
</template>
