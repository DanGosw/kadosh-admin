<script setup lang="ts">

import { ref } from "vue";
import { useMembersStore } from "@/stores/storeMembers";
import type { InterfaceMembers } from "@/composables/interfaceMembers";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import toastEvent from "@/composables/toastEvent";
import { parseISO, isValid } from "date-fns";
import type { FileUploadSelectEvent } from "primevue";

const refDrawerMembersSaved = ref();
const isClickCard = ref(false);
const membersStoreOptions = useMembersStore();
const fileAccept = ref<string>("image/png, image/jpeg, image/jpg");

const props = defineProps({
    closeModal: { default: () => ({}), required: false, type: Function },
    refreshData: { default: () => ({}), required: false, type: Function },
    formData: { default: {} as InterfaceMembers, required: false, type: Object }
});

const formMembers = ref<InterfaceMembers>({
    birthdate: null, church: "", dni: "", docType: "dni", gender: "", isMember: "", lastnames: "", names: "", phone: "",
    voucherImage: undefined
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
    phone: yup.string().required("Añada un teléfono valido"),
    voucherImage: yup.object().shape({
        file: yup.mixed().required("Img. requerida"), objectURL: yup.string().required("Img. requerida")
    }).nullable()
}));

const { handleReset, handleSubmit, errors, setValues } = useForm<InterfaceMembers>({ validationSchema, initialValues: formMembers.value });

const { value: birthdate, handleBlur: birthdateHandle } = useField<Date | Date[] | (Date | null)[] | null>("birthdate");
const { value: church, handleBlur: churchHandle } = useField<string>("church");
const { value: dni, handleBlur: dniHandle } = useField<string>("dni");
const { value: docType, handleBlur: docTypeHandle } = useField<string>("docType");
const { value: gender, handleBlur: genderHandle } = useField<string>("gender");
const { value: isMember, handleBlur: isMemberHandle } = useField<string>("isMember");
const { value: lastnames, handleBlur: lastnamesHandle } = useField<string>("lastnames");
const { value: names, handleBlur: namesHandle } = useField<string>("names");
const { value: phone, handleBlur: phoneHandle } = useField<string>("phone");
const { value: voucherImage, setValue: setVoucherImage } = useField<object>("voucherImage");

const optionsDocuments = ref([
    { name: "DNI", code: "dni" },
    { name: "RUC", code: "ruc" },
    { name: "SIN DOCUMENTO", code: "sd" }
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
    if ( !props.formData?.id) membersStoreOptions.addNewMembers(values, handleReset, isClickCard.value);
    isClickCard.value = false;
}, () => {
    toastEvent({ severity: "error", summary: "Error al guardar", message: "Por favor, llene el formulario." });
});

const onClickCardMember = (data: InterfaceMembers) => {
    const parsedDate = typeof data.birthdate === "string" ? parseISO(data.birthdate) : data.birthdate;
    setValues({ ...data, birthdate: parsedDate && isValid(parsedDate) ? parsedDate : data.birthdate });
    isClickCard.value = true;
};

const setVoucherImageFile = (file: File | null) => {
    if (file) {
        setVoucherImage({
            file,
            objectURL: URL.createObjectURL(file)
        });
    } else {
        setVoucherImage({});
    }
};

const updateVisibilityDrawer = () => refDrawerMembersSaved.value.visibleDrawer = true;

</script>

<template>
    <div class="mx-auto max-w-screen-sm align-items-form sm:px-6 md:px-8 lg:px-10">
        <FormItem label="Tipo de Documento" cols="12">
            <Select fluid v-model="docType" @blur="docTypeHandle($event, true)" :options="optionsDocuments" optionLabel="name"
                    option-value="code" size="large" :disabled="isClickCard"/>
        </FormItem>
        <FormItem label="DNI" cols="12">
            <InputGroup>
                <InputText fluid v-model="dni" @blur="dniHandle($event, true)" placeholder="Ingrese nro de DNI" v-key-filter.num
                           maxlength="8" :invalid="!!errors.dni" size="large" :disabled="isClickCard"/>
                <Button label="Buscar" :disabled="isClickCard">
                    <template #icon>
                        <i-material-symbols-database-search/>
                    </template>
                </Button>
            </InputGroup>
        </FormItem>
        <FormItem label="Nombres" cols="12">
            <InputText fluid v-model="names" @blur="namesHandle($event, true)" :invalid="!!errors.names" size="large"/>
        </FormItem>
        <FormItem label="Apellidos" cols="12">
            <InputText fluid v-model="lastnames" @blur="lastnamesHandle($event, true)" :invalid="!!errors.lastnames" size="large"/>
        </FormItem>
        <FormItem label="Género" cols="12">
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2">
                    <RadioButton v-model="gender" inputId="gender1" name="gender" value="M" @blur="genderHandle($event, true)"
                                 :invalid="!!errors.gender"/>
                    <label for="gender1">Masculino</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="gender" inputId="gender2" name="gender" value="F" @blur="genderHandle($event, true)"
                                 :invalid="!!errors.gender"/>
                    <label for="gender2">Femenino</label>
                </div>
            </div>
        </FormItem>
        <FormItem label="F. de Nacimiento" cols="12">
            <DatePicker fluid v-model="birthdate" @blur="birthdateHandle(undefined, true)" :invalid="!!errors.birthdate" size="large"
                        date-format="d/m/yy"/>
        </FormItem>
        <FormItem label="Celular" cols="12">
            <InputText fluid v-model="phone" @blur="phoneHandle($event, true)" maxlength="9" v-key-filter.num :invalid="!!errors.phone"
                       size="large"/>
        </FormItem>
        <FormItem label="¿Perteneces a alguna iglesia?" cols="12">
            <div class="flex flex-wrap items-center gap-4">
                <div class="flex items-center gap-2">
                    <RadioButton v-model="isMember" inputId="isMember1" name="isMember" value="Pastor" :invalid="!!errors.isMember"
                                 size="large" @blur="isMemberHandle($event, true)"/>
                    <label for="isMember1">Pastor</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="isMember" inputId="isMember2" name="isMember" value="Líder" :invalid="!!errors.isMember"
                                 size="large" @blur="isMemberHandle($event, true)"/>
                    <label for="isMember2">Líder</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="isMember" inputId="isMember3" name="isMember" value="Miembro Activo" :invalid="!!errors.isMember"
                                 size="large" @blur="isMemberHandle($event, true)"/>
                    <label for="isMember3">Miembro Activo</label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioButton v-model="isMember" inputId="isMember4" name="isMember" value="Invitado" :invalid="!!errors.isMember"
                                 size="large" @blur="isMemberHandle($event, true)"/>
                    <label for="isMember4">Invitado</label>
                </div>
            </div>
        </FormItem>
        <FormItem label="Iglesia" cols="12">
            <Select :options="optionsChurches" fluid v-model="church" @blur="churchHandle($event, true)" filter show-clear size="large"
                    :invalid="!!errors.church" reset-filter-on-clear reset-filter-on-hide optionLabel="name" option-value="code"/>
        </FormItem>
        <FormItem label="Voucher de pago" cols="12" :error="errors.voucherImage">
            <FileUpload name="waterMark[0]" :accept="fileAccept" :max-file-size="1000000" :file-limit="3" class="w-full"
                        @select="(files:FileUploadSelectEvent)=> setVoucherImageFile(files.files[0])" :show-cancel-button="false"
                        @remove="setVoucherImage({})" v-model="voucherImage" :show-upload-button="false" input-id="voucherImage"
                        invalid-file-size-message="Peso de imagen invalido" invalid-file-limit-message="1 imagen máximo.">
            </FileUpload>
        </FormItem>

        <div class="max-cols-4">
            <Button label="Ver Lista" severity="secondary" @click="updateVisibilityDrawer "
                    v-if="membersStoreOptions.membersData.length >= 1" fluid>
                <template #icon>
                    <i-material-symbols-list-alt-check/>
                </template>
            </Button>
        </div>

        <div class="max-cols-4">
            <Button label="Cancelar" severity="warn" fluid>
                <template #icon>
                    <i-material-symbols-tab-close/>
                </template>
            </Button>
        </div>
        <div class="max-cols-4">
            <Button :label=" isClickCard ? 'Editar' :'¡Agregar!'" @click="saveNewMember()" fluid>
                <template #icon>
                    <i-material-symbols-sync-saved-locally/>
                </template>
            </Button>
        </div>
    </div>
    {{ typeof voucherImage }}
    <drawer-members-saved ref="refDrawerMembersSaved" @on-click-card="onClickCardMember"/>
</template>
