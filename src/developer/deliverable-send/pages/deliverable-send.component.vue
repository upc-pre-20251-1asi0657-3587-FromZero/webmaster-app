<script>
export default {
  name: "deliverable-send",
  methods: {
    goToDeliverableList() {
      const { projectId} = this.$route.params;
      this.$router.push(`/projects/developers/${projectId}/Deliverables`);
    }
  }
}
</script>

<template>
  <div class="flex flex-column align-items-center">
    <div class="bg-white p-4 border-round-xl m-8 w-8 flex justify-content-center">
      <p class="text-4xl">{{ $t('sent-deliverable') }} </p>
    </div>

    <div class="flex justify-content-center mb-8">
      <pv-button @click="goToDeliverableList" class="bg-white text-black-alpha-90 border-black-alpha-90 border-round-3xl text-xl mt-6 mb-8" aria-label="Back Button">{{ $t('back-button') }}</pv-button>
    </div>

  </div>
</template>

<style scoped>

</style>