<template>
  <form
      @submit.prevent="submit"
      :ref="name"
      :event="event"
      :action="action"
      :autocomplete="autocomplete"
      :method="method"
      class="needs-validation"
      novalidate>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "FormTag",
  props: ["method", "action", "autocomplete", "name", "event"],
  methods: {
    submit() {
      let submittedForm = this.$refs[this.$props.name];
      if (submittedForm.checkValidity()) {
        // console.log("My event name", this.$props['event'])
        // console.log("name", this.$props.name)
        this.$emit(this.$props['event'])
      }
      submittedForm.classList.add("was-validated")
    }
  },
}
</script>

<style scoped>

</style>