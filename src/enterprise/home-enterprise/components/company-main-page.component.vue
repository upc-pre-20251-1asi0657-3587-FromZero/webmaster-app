<script>
import { ref, computed } from "vue";
import { HomeService } from "../../../../public/services/home.service.js";

export default {
  name: "company-main-page",
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const homeService = new HomeService();

    // Usar directamente el ID de la empresa desde props
    const enterpriseId = computed(() => props.company.enterprise_id || props.company.id);

    // Estados de edición
    const isEditingMain = ref(false);
    const mainText = ref(props.company.description || "");
    const isEditingCategories = ref([false, false, false, false, false, false]);
    const categoryTexts = ref([
      props.company.country || "",
      props.company.ruc || "",
      props.company.phone || "",
      props.company.email || "",
      props.company.website || "",
      props.company.sector || ""
    ]);
    const displayDialog = ref(false);
    const newImgUrl = ref("");

    // Editar campo principal (descripción)
    const toggleEditingMain = async () => {
      if ( isEditingMain.value ) {
        const updatedInfo = {
          // Aquí definimos exactamente el payload que espera el endpoint PUT /enterprises/{id}
          enterpriseName:    props.company.enterprise_name,  // si quieres permitir editarlo
          description:       mainText.value,
          country:           categoryTexts.value[0],
          ruc:               categoryTexts.value[1],
          phone:             categoryTexts.value[2],
          website:           categoryTexts.value[4],
          profileImgUrl:     props.company.profile_img_url,   // o profileImgUrl
          sector:            categoryTexts.value[5]
        };

        try {
          await homeService.updateEnterpriseInfo( enterpriseId.value, updatedInfo );
        }
        catch(err) {
          console.error("Error al actualizar información:", err);
        }
      }
      isEditingMain.value = !isEditingMain.value;
    };

    // Editar categoría individual
    const toggleEditingCategory = async (index) => {
      if ( isEditingCategories.value[index] ) {
        const updatedInfo = {
          enterpriseName: props.company.enterprise_name,
          description:    mainText.value,
          country:        categoryTexts.value[0],
          ruc:            categoryTexts.value[1],
          phone:          categoryTexts.value[2],
          website:        categoryTexts.value[4],
          profileImgUrl:  props.company.profile_img_url,
          sector:         categoryTexts.value[5]
        };

        try {
          await homeService.updateEnterpriseInfo( enterpriseId.value, updatedInfo );
        }
        catch(err) {
          console.error("Error al actualizar categoría:", err);
        }
      }
      isEditingCategories.value[index] = !isEditingCategories.value[index];
    };


    // Actualizar imagen
    const updateImg = async () => {
      if (!newImgUrl.value) return;
      const imgData = { profileImgUrl: newImgUrl.value };
      newImgUrl.value = "";
      try {
        await homeService.updateEnterpriseProfileImg(enterpriseId.value, imgData);
        window.location.reload();
      } catch (err) {
        console.error("Error al actualizar imagen:", err);
      }
    };

    const openDialog = () => (displayDialog.value = true);
    const closeDialog = () => (displayDialog.value = false);

    return {
      isEditingMain,
      mainText,
      isEditingCategories,
      categoryTexts,
      displayDialog,
      newImgUrl,
      toggleEditingMain,
      toggleEditingCategory,
      updateImg,
      openDialog,
      closeDialog
    };
  }
};
</script>

<template>
  <pv-card aria-label="Company Information">
    <template #title>
      <pv-avatar
          :image="company.profile_img_url"
          class="mr-2"
          size="xlarge"
          shape="circle"
          @click="openDialog"
      />
      <div aria-label="Company Name">
        <p>{{ company.enterprise_name }}</p>
      </div>
    </template>

    <template #content>
      <hr aria-label="Separator Line" />
      <div class="subtitle" aria-label="Summary">{{ $t('company-main-page-part1') }}</div>

      <!-- Descripción editable -->
      <div class="editable-container">
        <span v-if="!isEditingMain" class="editable-text">{{ mainText }}</span>
        <pv-textarea
            v-else
            v-model="mainText"
            auto-resize
            class="editable-input"
        />
        <pv-button
            @click="toggleEditingMain"
            icon="pi pi-pencil"
            class="edit-button"
            v-if="!isEditingMain"
        />
        <pv-button
            @click="toggleEditingMain"
            icon="pi pi-check"
            class="edit-button"
            v-else
        />
      </div>

      <!-- Campos editables básicos -->
      <div v-for="(label, idx) in ['country','ruc','phone',/*'email'*/'website','sector']" :key="idx" class="editable-container secondary">
        <div class="subtitle">{{ $t(`categories.${label}`) }}</div>
        <span v-if="!isEditingCategories[idx]" class="editable-text">{{ categoryTexts[idx] }}</span>
        <input
            v-else
            v-model="categoryTexts[idx]"
            type="text"
            class="editable-input"
        />
        <pv-button
            @click="toggleEditingCategory(idx)"
            icon="pi pi-pencil"
            class="edit-button"
            v-if="!isEditingCategories[idx]"
        />
        <pv-button
            @click="toggleEditingCategory(idx)"
            icon="pi pi-check"
            class="edit-button"
            v-else
        />
      </div>
    </template>
  </pv-card>

  <!-- Diálogo para cambiar imagen -->
  <pv-modal v-model:visible="displayDialog" modal header="Update Image URL">
    <p>Enter the new image URL:</p>
    <input type="text" v-model="newImgUrl" class="editable-input" />
    <pv-button label="Accept" @click="updateImg" />
    <pv-button label="Cancel" @click="closeDialog" />
  </pv-modal>
</template>

  <style scoped>
    .editable-container { display:flex; align-items:center; margin: .5rem 0; }
    .editable-input { flex:1; border-bottom:1px solid #ccc; padding: .25rem; }
    .edit-button { margin-left:.5rem; }
    .secondary { display:grid; grid-template-columns: 1fr auto; gap: .5rem; align-items:center; }
    .subtitle { color: #64748b; width: 6rem; }

    .editable-container { display:flex; align-items:center; margin: .5rem 0; }
    .editable-input { flex:1; border-bottom:1px solid #ccc; padding: .25rem; }
    .edit-button { margin-left:.5rem; }
    .secondary { display:grid; grid-template-columns: 1fr auto; gap: .5rem; align-items:center; }
    .subtitle { color: #64748b; width: 6rem; }


hr{
  opacity:0.3;
}

@media (max-width: 799px) {
  .p-card{
    margin-top:2rem;
  }
}

.p-card {
  width: 30rem;
  min-width: 20rem;
  box-shadow: 0 20px 40px rgb(57, 57, 57);
  margin-top: 4rem;
  max-height: 800px;
}
:deep(.p-card-title) {
  display: flex;
  align-items: center;
  margin: 20px 20px 0 20px;
  justify-content: center;
}
:deep(.p-avatar) {
  display: flex;
  justify-content: center;
}
img {
  min-width: 64px;
}

:deep(.p-card-content) {
  margin: 0 20px;
}
:deep(.p-rating .p-rating-item.p-rating-item-active .p-rating-icon) {
  color: gold;
}
.subtitle {
  color: #64748b;
}

.editable-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.editable-text{
  word-wrap: break-word;
}
.editable-text,
.editable-input {
  flex-grow: 1;
  border: none;
}

.editable-input{
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-family: inherit;
  resize: none;
  overflow: hidden;
  word-wrap: break-word;
  min-height: 1.2rem;
}

:deep(.p-inputtext) {
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 0 0 rgba(18, 18, 23, 0.05) !important;
  padding: 0 !important;
  border-radius: 0px;

}

span{
  max-width: 90%;
}

.edit-button {
  padding: 6px;
  height: 100%;
}
:deep(.p-button.p-button-text) {
  background-color: transparent;
  color: #B864F3;
  border-color: transparent;
}
.secondary{
  display:grid;
  grid-template-columns: 10fr 10fr 1fr;
}

</style>