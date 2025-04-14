<script setup lang="ts">

import { ref } from "vue";
import { useMembersStore } from "@/stores/storeMembers";
import type { InterfaceMembers } from "@/composables/interfaceMembers";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import toastEvent from "@/composables/toastEvent";

const refDrawerMembersSaved = ref();
const membersStoreOptions = useMembersStore();

const props = defineProps({
    idMember: { required: false, default: null }
});

const formMembers = ref<InterfaceMembers>({
    birthdate: undefined, church: "", dni: "", docType: "dni", gender: "", isMember: "", lastnames: "", names: "", phone: ""
});

const validationSchema = ref(yup.object({
    birthdate: yup.string().required("Agrega una fecha valida"),
    church: yup.string().required("Seleccione una iglesia"),
    dni: yup.string().required("Agregue un DNI"),
    docType: yup.string().required("Seleccione un tipo de identificación"),
    gender: yup.string().required("Seleccione un género"),
    isMember: yup.string().required("Seleccione a donde pertenece"),
    lastnames: yup.string().required("Agregue sus apellidos"),
    names: yup.string().required("Agregue sus nombres"),
    phone: yup.string().required("Añada un teléfono valido")
}));

const { handleReset, handleSubmit } = useForm<InterfaceMembers>({ validationSchema, initialValues: formMembers.value });

const { value: birthdate, handleBlur: birthdateHandle } = useField<undefined>("birthdate");
const { value: church, handleBlur: churchHandle } = useField<string>("church");
const { value: dni, handleBlur: dniHandle } = useField<string>("dni");
const { value: docType, handleBlur: docTypeHandle } = useField<string>("docType");
const { value: gender, handleBlur: genderHandle } = useField<string>("gender");
const { value: isMember, handleBlur: isMemberHandle } = useField<string>("isMember");
const { value: lastnames, handleBlur: lastnamesHandle } = useField<string>("lastnames");
const { value: names, handleBlur: namesHandle } = useField<string>("names");
const { value: phone, handleBlur: phoneHandle } = useField<string>("phone");


const optionsDocuments = ref([
    { name: "DNI", code: "dni" },
    { name: "RUC", code: "ruc" },
    { name: "SIN DOCUMENTO", code: "sd" }
]);

const optionsPertinence = ref([
    { name: "Pastor", code: "dni" },
    { name: "Líder", code: "ruc" },
    { name: "Miembro Activo", code: "x" },
    { name: "Invitado", code: "d" }
]);

const optionsGenders = ref([
    { name: "Masculino", code: "dni" },
    { name: "Femenino", code: "ruc" },
    { name: "39 tipos de gei", code: "x" },
    { name: "Sin Genero", code: "d" }
]);

const optionsChurches = ref([
    { name: "Ninguna", code: "dni" },
    { name: "Otra", code: "ruc" },
    { name: "Aguas Claras", code: "x" },
    { name: "Aguas medio claras", code: "d" },
    { name: "Aguas medio casi claras", code: "dd" },
    { name: "Aguas oscuras", code: "w" }
]);

const saveNewMember = handleSubmit((values) => {
    if ( !props.idMember) membersStoreOptions.addNewMembers(values, handleReset);
}, ({ errors }) => {
    toastEvent({ severity: "error", summary: "Error al guardar", message: "Por favor, llene el formulario." });
    console.log(errors);
});

const updateVisibilityDrawer = () => refDrawerMembersSaved.value.visibleDrawer = true;

</script>

<template>
    <div class="align-items-form">
        <FormItem label="Tipo de Documento" cols="3">
            <Select fluid v-model="docType" @blur="docTypeHandle($event, true)" :options="optionsDocuments" optionLabel="name"
                    option-value="code"/>
        </FormItem>
        <FormItem label="DNI" cols="4">
            <InputGroup>
                <InputText fluid v-model="dni" @blur="dniHandle($event, true)" placeholder="Ingrese nro de DNI" v-key-filter.num/>
                <Button label="Buscar">
                    <template #icon>
                        <i-material-symbols-database-search/>
                    </template>
                </Button>
            </InputGroup>
        </FormItem>
        <FormItem label="Nombres" cols="5">
            <InputText fluid v-model="names" @blur="namesHandle($event, true)"/>
        </FormItem>
        <FormItem label="Apellidos" cols="5">
            <InputText fluid v-model="lastnames" @blur="lastnamesHandle($event, true)"/>
        </FormItem>
        <FormItem label="Género" cols="3">
            <Select fluid :options="optionsGenders" optionLabel="name" option-value="code" v-model="gender"
                    @blur="genderHandle($event, true)"/>
        </FormItem>
        <FormItem label="F. de Nacimiento" cols="2">
            <DatePicker fluid v-model="birthdate" @blur="birthdateHandle(undefined, true)"/>
        </FormItem>
        <FormItem label="Celular" cols="2">
            <InputText fluid v-model="phone" @blur="phoneHandle($event, true)" maxlength="9" v-key-filter.num/>
        </FormItem>
        <FormItem label="¿Perteneces a alguna iglesia?" cols="3">
            <Select fluid v-model="isMember" @blur="isMemberHandle($event, true)" :options="optionsPertinence" optionLabel="name"
                    option-value="code" show-clear/>
        </FormItem>
        <FormItem label="Iglesia" cols="4">
            <Select :options="optionsChurches" fluid v-model="church" @blur="churchHandle($event, true)" filter show-clear
                    reset-filter-on-clear reset-filter-on-hide optionLabel="name" option-value="code"/>
        </FormItem>
    </div>

    <div class="flex items-center justify-between">
        <div>
            <Button label="Ver Lista" severity="secondary" @click="updateVisibilityDrawer"
                    v-if="membersStoreOptions.membersData.length >=1">
                <template #icon>
                    <i-material-symbols-list-alt-check/>
                </template>
            </Button>
        </div>
        <div class="flex gap-2">
            <Button label="Cancelar :(" severity="warn">
                <template #icon>
                    <i-material-symbols-tab-close/>
                </template>
            </Button>
            <Button label="¡Agregar!" @click="saveNewMember()">
                <template #icon>
                    <i-material-symbols-sync-saved-locally/>
                </template>
            </Button>
        </div>
    </div>
    <drawer-members-saved ref="refDrawerMembersSaved"/>
</template>
