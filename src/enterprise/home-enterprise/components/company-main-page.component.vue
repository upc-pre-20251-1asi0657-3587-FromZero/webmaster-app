<script>
import { inject, ref, computed } from "vue";
import { HomeService } from "../../../../public/services/home.service.js";

export default {
  name: "developer-page",
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const enterpriseId = inject("enterpriseId"); // ✅ Inyectado desde padre
    const homeService = new HomeService();

    console.log(props.company, "props.company");

    // Estado reactivo
    const isEditingMain = ref(false);
    const mainText = ref(props.company.description || "");
    const isEditingCategories = ref([false, false, false, false, false, false]);
    const categoryTexts = ref([
      props.company.country || "",
      props.company.RUC || "",
      props.company.phone || "",
      props.company.User?.mail || "",
      props.company.website || "",
      props.company.sector || ""
    ]);
    const displayDialog = ref(false);
    const newImgUrl = ref("");

    // Categorías para labels
    const categories = [
      "categories.country",
      "categories.ruc",
      "categories.phone",
      "categories.email",
      "categories.website",
      "categories.sector"
    ];

    // Función para actualizar información general
    const toggleEditingMain = async () => {
      if (isEditingMain.value) {
        const updatedInfo = {
          description: mainText.value,
          country: categoryTexts.value[0],
          ruc: categoryTexts.value[1],
          phone: categoryTexts.value[2],
          website: categoryTexts.value[4],
          profile_img_url: props.company.profile_img_url,
          sector: categoryTexts.value[5]
        };

        try {
          await homeService.updateEnterpriseInfo(enterpriseId, updatedInfo);
        } catch (err) {
          console.error("Error al actualizar información:", err);
        }
      }
      isEditingMain.value = !isEditingMain.value;
    };

    // Función para editar categoría individual
    const toggleEditingCategory = async (index) => {
      if (isEditingCategories.value[index]) {
        const updatedInfo = {
          description: mainText.value,
          country: categoryTexts.value[0],
          ruc: categoryTexts.value[1],
          phone: categoryTexts.value[2],
          website: categoryTexts.value[4],
          profile_img_url: props.company.profile_img_url,
          sector: categoryTexts.value[5]
        };

        try {
          await homeService.updateEnterpriseInfo(enterpriseId, updatedInfo);
        } catch (err) {
          console.error("Error al actualizar categoría:", err);
        }
      }
      isEditingCategories.value[index] = !isEditingCategories.value[index];
    };

    // Función para actualizar imagen
    const updateImg = async () => {
      if (!newImgUrl.value) return;

      const imgData = { profile_img_url: newImgUrl.value };
      newImgUrl.value = "";

      try {
        await homeService.updateEnterpriseProfileImg(enterpriseId, imgData);
        displayDialog.value = false;
        window.location.reload(); // O actualiza el estado local si prefieres
      } catch (err) {
        console.error("Error al actualizar imagen:", err);
      }
    };

    // Funciones para el diálogo
    const openDialog = () => (displayDialog.value = true);
    const closeDialog = () => (displayDialog.value = false);

    return {
      isEditingMain,
      mainText,
      isEditingCategories,
      categoryTexts,
      categories,
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
          :image="company.profileImgUrl"
          class="mr-2"
          size="xlarge"
          shape="circle"
          @click="openDialog"
      />
      <div aria-label="Company Name">
        <p>{{ company.enterpriseName}}</p>
      </div>
    </template>

    <template #content>
      <hr aria-label="Separator Line" />
      <div class="subtitle" aria-label="Summary">{{ $t('company-main-page-part1') }}</div>

      <!-- Campo principal (descripción) -->
      <div class="editable-container" aria-label="Main Text Container">
        <span v-if="!isEditingMain" class="editable-text" aria-label="Main Text">{{ mainText }}</span>
        <pv-textarea
            v-else
            v-model="mainText"
            auto-resize
            class="editable-input"
            aria-label="Main Text Input"
        />
        <pv-button
            @click="toggleEditingMain"
            icon="pi pi-pencil"
            class="p-button-rounded p-button-text edit-button"
            v-if="!isEditingMain"
            aria-label="Edit Main Text Button"
        />
        <pv-button
            @click="toggleEditingMain"
            icon="pi pi-check"
            class="p-button-rounded p-button-text edit-button"
            v-else
            aria-label="Confirm Main Text Button"
        />
      </div>

      <!-- Categorías dinámicas -->
      <template v-for="(category, index) in categories" :key="index">
        <hr :aria-label="`Separator Line ${index}`" v-if="index !== 0" />
        <div class="editable-container secondary" aria-label="Category Container">
          <div class="subtitle" aria-label="Category Title">{{ $t(category) }}</div>
          <span v-if="!isEditingCategories[index]" class="editable-text" aria-label="Category Text">{{ categoryTexts[index] }}</span>
          <input
              v-else
              v-model="categoryTexts[index]"
              type="text"
              class="editable-input"
              aria-label="Category Text Input"
          />
          <pv-button
              @click="toggleEditingCategory(index)"
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text edit-button"
              v-if="!isEditingCategories[index]"
              aria-label="Edit Category Button"
          />
          <pv-button
              @click="toggleEditingCategory(index)"
              icon="pi pi-check"
              class="p-button-rounded p-button-text edit-button"
              v-else
              aria-label="Confirm Category Button"
          />
        </div>
      </template>
    </template>
  </pv-card>

  <!-- Diálogo para cambiar imagen -->
  <pv-modal v-model:visible="displayDialog" modal header="Update Image URL">
    <p>Enter the new image URL:</p>
    <input type="text" v-model="newImgUrl" />
    <pv-button label="Accept" @click="updateImg" />
    <pv-button label="Cancel" @click="closeDialog" />
  </pv-modal>
</template>

<style scoped>

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
