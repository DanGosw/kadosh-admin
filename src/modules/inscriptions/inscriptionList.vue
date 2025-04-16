<script setup lang="ts">

/* Imports */
import EmptyTable from "@/components/emptyTable.vue";
import LoadingData from "@/components/loadingPage.vue";
import ModalComponent from "@/components/modalComponent.vue";
import registerMembers from "@/modules/registerMembers.vue";
import { type ModalParameters } from "@/composables/parametersModalType";
import { type InterfaceMembers, type InterfaceResponseMembers } from "@/composables/interfaceMembers";
import { ref, h, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { Api } from "@/api/connection";

/* Defaults Variables */
const dataMembers = ref<InterfaceMembers[]>([]);
const loading = ref<boolean>(false);

/**
 * @params {Function} closeModal - Function that returns visible of the modal.
 * @returns {void} - Change the visibility of the modal
 */
const closeModal = (): boolean => parametersModal.value.visible = false;

/**
 * Carga datos de la API de usuarios.
 *
 * @async
 * @function loadUserList
 * @description Realiza una llamada a la API para obtener una lista de usuarios basada en la paginación.
 * @params {Object} options - Opciones para la solicitud de la API.
 * @params {number} options.limit - El límite de usuarios a retornar.
 * @params {number} options. Offset - El desplazamiento de inicio para la consulta de usuarios.
 * @returns {Promise<void>} - La promesa que representa el proceso de carga de datos.
 */
const loadUserList = useDebounceFn(async(): Promise<void> => {
    loading.value = true;
    const { response }: InterfaceResponseMembers = await Api.Get({ route: "inscriptions" });
    if (response && response.status === 200) {
        dataMembers.value = response.data;
        loading.value = false;
    }
}, 250);

/**
 * Initial values that are passed to the modal
 */
const parametersModal = ref<ModalParameters>({
    component: {},
    footer: null,
    header: "",
    visible: false,
    width: "30vw"
});

const addParametersUserModal = (data: InterfaceMembers): void => {
    parametersModal.value = {
        component: h(registerMembers, {
            closeModal,
            refreshData: () => loadUserList(),
            formData: <InterfaceMembers> { ...data }
        }),
        footer: "",
        header: `Editar: ${ data.names } ${ data.lastnames }`,
        visible: true,
        width: "40vw"
    };
};

const addParametersChangePassword = (data: InterfaceMembers): void => {
    parametersModal.value = {
        component: h("changePassword", {
            closeForm: closeModal,
            userID: data?.id
        }),
        footer: "",
        header: `Cambiar contraseña de ${ data.names }`,
        visible: true,
        width: "35vw"
    };
};

onMounted(async() => {
    await loadUserList();
});

defineExpose({ loadUserList });

</script>

<template>
    <div class="relative mb-2">
        <i-ri-search-line class="absolute top-2/4 left-3 -mt-2.5 text-surface-400 dark:text-surface-600"/>
        <InputText placeholder="Buscar usuario" class="!pl-10 max-w-96" fluid/>
    </div>
    <DataTable size="small" :value="dataMembers" scroll-height="65vh" scrollable tableStyle="min-width: 80rem;" lazy :loading dataKey="id">
        <template #empty>
            <empty-table/>
        </template>
        <template #loading>
            <loading-data/>
        </template>
        <Column style="width: 10%" field="username" header="DNI/Nombres"/>
        <Column style="width: 10%" field="names" header="Género"/>
        <Column style="width: 10%" field="email" header="Iglesia"/>
        <Column style="width: 10%" field="fk_profile.description" header="Teléfono"/>
        <Column style="width: 10%" field="fk_branch.description" header="# Grupo"/>
        <Column style="width: 10%" field="jobStart" header="Cod. Grupo"/>
        <Column style="width: 10%" field="jobStart" header="M. Pago"/>
        <Column style="width: 10%" field="jobStart" header="Monto"/>
        <Column style="width: 10%" field="jobStart" header="Estado"/>
        <Column style="width: 10%" field="jobStart" header="Observaciones"/>
        <Column style="width: 5%" header="Estado" field="active">
            <template #body="{data}">
                <Message size="small" :severity="data.active? 'success' : 'error'">
                    {{ data.active ? "Activo" : "Inactivo" }}
                </Message>
            </template>
        </Column>
        <Column style="width: 5%" header="Acciones">
            <template #body="{data}">
                <div class="flex items-center justify-center space-x-1">
                    <Button size="small" severity="warn" v-tooltip.top="'Editar Usuario'" @click="addParametersUserModal(data)"
                            class="h-6 !w-6">
                        <template #icon>
                            <i-tabler-user-edit/>
                        </template>
                    </Button>
                    <Button size="small" severity="info" v-tooltip.top="'Cambiar Contraseña'" @click="addParametersChangePassword(data)"
                            class="h-6 !w-6">
                        <template #icon>
                            <i-material-symbols-lock/>
                        </template>
                    </Button>
                </div>
            </template>
        </Column>
    </DataTable>
    <modal-component ref="modal" :parameters="parametersModal"/>
</template>
