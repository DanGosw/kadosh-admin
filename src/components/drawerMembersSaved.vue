<script setup lang="ts">

import { ref } from "vue";
import { useMembersStore } from "@/stores/storeMembers.ts";
import Drawer from "primevue/drawer";

const visibleDrawer = ref(false);
const membersStoreOptions = useMembersStore();

defineEmits([ "onClickCard" ]);
defineExpose({ visibleDrawer });

</script>

<template>
    <Drawer v-model:visible="visibleDrawer" dismissable position="right">
        <template #header>
            <div>
                <p class="p-card-title">
                    Lista de Personas
                </p>
                <p class="p-card-subtitle">
                    {{ membersStoreOptions.membersData.length }} Persona(s) registradas
                </p>
            </div>
        </template>
        <div class="grid space-y-2">
            <cards-info-member v-for="data in  membersStoreOptions.membersData" :key="data.dni" :birthdate="data.birthdate" :dni="data.dni"
                               :church="data.church" :doc-type="data.docType" :gender="data.gender" :is-member="data.isMember"
                               :names="data.names" :lastnames="data.lastnames" :phone="data.phone" @click="$emit('onClickCard', (data))"/>
        </div>
        <template #footer>
            <div class="align-buttons-card-footer">
                <Button label="Agregar otro" severity="secondary" @click="visibleDrawer = false">
                    <template #icon>
                        <i-material-symbols-list-alt-add/>
                    </template>
                </Button>
                <Button label="Pagar">
                    <template #icon>
                        <i-ic-baseline-payments/>
                    </template>
                </Button>
            </div>
        </template>
    </Drawer>
</template>
