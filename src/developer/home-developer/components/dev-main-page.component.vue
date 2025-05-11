<template>
  <pv-card aria-label="Developer Information">
    <template #title>

      <pv-avatar :image="developer.profile_img_url" class="mr-2" size="xlarge" shape="circle"
                 aria-label="Developer Avatar" @click="openDialog"/>
      <div aria-label="Developer Details">
          <p>{{ developer.name }}</p>
      </div>
    </template>

    <template #content>
      <hr aria-label="Separator Line">
      <div class="subtitle" aria-label="Summary">{{ $t('dev-main-page-part1') }}</div>
      <div class="editable-container" aria-label="Main Text Container">
        <span v-if="!isEditingMain" class="editable-text" aria-label="Main Text">{{ mainText }}</span>
        <pv-textarea v-else v-model="mainText" type="text" class="editable-input" autoResize
                     aria-label="Main Text Input"/>
        <pv-button @click="toggleEditingMain" icon="pi pi-pencil" class="p-button-rounded p-button-text edit-button"
                   v-if="!isEditingMain" aria-label="Edit Main Text Button"/>
        <pv-button @click="toggleEditingMain" icon="pi pi-check" class="p-button-rounded p-button-text edit-button"
                   v-else aria-label="Confirm Main Text Button"/>
      </div>

      <template v-for="(category, index) in categories" :key="index">
        <hr aria-label="Separator Line" v-if="index !== 0">
        <div class="editable-container secondary" aria-label="Category Container">
          <div class="subtitle" aria-label="Category Title">{{ $t(category) }}</div>
          <span v-if="!isEditingCategories[index]" class="editable-text"
                aria-label="Category Text">{{ categoryTexts[index] }}</span>
          <input v-else v-model="categoryTexts[index]" type="text" class="editable-input"
                 aria-label="Category Text Input"/>
          <pv-button @click="toggleEditingCategory(index)" icon="pi pi-pencil"
                     class="p-button-rounded p-button-text edit-button" v-if="!isEditingCategories[index]"
                     aria-label="Edit Category Button"/>
          <pv-button @click="toggleEditingCategory(index)" icon="pi pi-check"
                     class="p-button-rounded p-button-text edit-button" v-else aria-label="Confirm Category Button"/>
        </div>
      </template>
    </template>
  </pv-card>

  <pv-modal v-model:visible="displayDialog" modal header="Update Image URL" style="width: 80%; height: 100%;max-width: 600px; min-width: 300px; max-height: 500px;" class="flex flex-column justify-content-center gap-5">
    <img
        v-if="previewImage"
        :src="previewImage"
        alt="Vista previa"
        class="preview-image"
    />
    <pv-file-upload
        mode="basic"
        name="file"
        :customUpload="true"
        @select="handleFileSelect"
        accept="image/*"
        chooseLabel="Select Image"
        class="mb-3"
    />

    <div class="flex flex-column gap-2">
      <label for="imageUrl">O ingresar URL:</label>
      <pv-inputText
          id="imageUrl"
          v-model="newImgUrl"
          placeholder="https://ejemplo.com/imagen.jpg"
      />
    </div>

    <footer class="w-full flex justify-content-center gap-2 mt-4">
      <pv-button label="Accept" @click="updateImg" />
      <pv-button label="Cancel" @click="closeDialog" />
    </footer>
  </pv-modal>
</template>

<script>
import { DeveloperEntity } from "../../../shared/models/developer.model.js";
import { HomeService } from "../../../../public/services/home.service.js";
import useSupabase from "../../../utils/supabase.js"; // Importar funciones de Supabase
//Test

export default {
  name: "developer-page",
  data() {
    return {
      isEditingMain: false,
      mainText: '',
      isEditingCategories: [false, false, false], // Updated to match the number of categories
      categoryTexts: [],
      categories: ['categories.country', 'categories.phone', 'categories.specialties'],
      value: 0,
      homeService: new HomeService(),
      displayDialog: false,
      newImgUrl: '',
      previewImage: null, // Para vista previa de la imagen
      selectedFile: null, // Para almacenar el archivo seleccionado
    };
  },
  methods: {
    // Método para manejar la selección de archivo de imagen
    handleFileSelect(event) {
      const file = event.files[0];
      if (!file) return;

      this.selectedFile = file;

      // Crear vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    // Método para actualizar la imagen
    async updateImg() {
      if (this.selectedFile === null) {
        return; // Si no se seleccionó un archivo, no hacemos nada
      }

      try {
        const fileExtension = this.selectedFile.name.split('.').pop().toLowerCase();
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error('Formato de imagen no válido. Use JPG, PNG o GIF');
        }

        // Nombre del archivo: "profile_[ID_DEV].[extensión]"
        const filePath = `profiles/profile_developer_${this.developer.id}.${fileExtension}`;

        // Subir archivo a Supabase Storage
        const { uploadFile, getPublicUrl } = useSupabase();
        await uploadFile("webmasterprofiles", filePath, this.selectedFile);

        const publicUrl = `${getPublicUrl("webmasterprofiles", filePath)}?t=${Date.now()}`;
        this.newImgUrl = publicUrl;

        // Actualizar la URL de la imagen en el perfil
        if (this.newImgUrl) {
          const updatedInfo = {
            firstName: this.developer.firstName,
            lastName: this.developer.lastName,
            description: this.mainText,
            country: this.categoryTexts[0],
            phone: this.categoryTexts[1],
            specialties: this.categoryTexts[2],
            profileImgUrl: this.newImgUrl,
          };

          await this.homeService.updateDevInfo(this.developer.id, updatedInfo);
          this.displayDialog = false;
          window.location.reload();
        }
      } catch (err) {
        console.error("Error al actualizar la imagen:", err);
      }
    },

    openDialog() {
      this.displayDialog = true;
    },
    closeDialog() {
      this.displayDialog = false;
      this.previewImage = null;
      this.selectedFile = null;
      this.newImgUrl = "";
    },

    async toggleEditingMain() {
      if (this.isEditingMain) {
        const updatedInfo = {
          firstName: this.developer.firstName,
          lastName: this.developer.lastName,
          description: this.mainText,
          country: this.categoryTexts[0],
          phone: this.categoryTexts[1],
          specialties: this.categoryTexts[2],
          profileImgUrl: this.developer.profile_img_url
        };
        await this.homeService.updateDevInfo(this.developer.id, updatedInfo);
      }
      this.isEditingMain = !this.isEditingMain;
    },

    async toggleEditingCategory(index) {
      if (this.isEditingCategories[index]) {
        const updatedInfo = {
          firstName: this.developer.firstName,
          lastName: this.developer.lastName,
          description: this.mainText,
          country: this.categoryTexts[0],
          phone: this.categoryTexts[1],
          specialties: this.categoryTexts[4],
          profileImgUrl: this.developer.profile_img_url
        };
        await this.homeService.updateDevInfo(this.developer.id, updatedInfo);

        // Update the local developer object
        switch (index) {
          case 0:
            this.developer.country = this.categoryTexts[0];
            break;
          case 1:
            this.developer.phone = this.categoryTexts[1];
            break;
          case 2:
            this.developer.specialties = this.categoryTexts[2];
            break;
        }
      }
      this.isEditingCategories[index] = !this.isEditingCategories[index];
    }
  },
  props: {
    developer: {
      type: DeveloperEntity,
      required: true
    }
  },
  created() {
    this.categoryTexts = [
      this.developer.country,
      this.developer.phone,
      this.developer.specialties
    ];
    console.log(this.developer, "developer");
    this.mainText = this.developer.description;
  }
};
</script>

<style scoped>

hr {
  opacity: 0.3;
}

@media (max-width: 799px) {
  .p-card {
    margin-top: 2rem;
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

.editable-text {
  word-wrap: break-word;
}

.editable-text,
.editable-input {
  flex-grow: 1;
  border: none;
}

.editable-input {
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

span {
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

.secondary {
  display: grid;
  grid-template-columns: 10fr 10fr 1fr;
}

</style>
