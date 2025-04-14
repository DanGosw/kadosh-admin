import { ref } from "vue";
import { defineStore } from "pinia";
import type { InterfaceMembers } from "@/composables/interfaceMembers.ts";
import toastEvent from "@/composables/toastEvent.ts";

export const useMembersStore = defineStore("counter", () => {
    const membersData = ref<InterfaceMembers[]>([]);

    const addNewMembers = (members: InterfaceMembers, resetFilters: () => void) => {
        const ifExistMember = membersData.value.find(dt => dt.dni === members.dni);
        if (ifExistMember) {
            toastEvent({
                closable: true, severity: "error", summary: "Error al guardar.",
                message: `La persona ${ members.names } ${ members.lastnames } ya fue agregado`
            });
            return;
        } else {
            toastEvent({
                severity: "success", summary: "!Éxito¡", message: `${ members.names } ${ members.lastnames } se agregó correctamente`
            });
            membersData.value.push(members);
            resetFilters();
        }
    };
    const removeMembers = (members: InterfaceMembers) => {
        membersData.value = membersData.value.filter(dt => dt.dni !== members.dni);
        toastEvent({
            severity: "success", summary: "!Eliminado¡", message: `${ members.names } ${ members.lastnames } se eliminó de la lista`
        });
    };

    return { membersData, addNewMembers, removeMembers };
});
