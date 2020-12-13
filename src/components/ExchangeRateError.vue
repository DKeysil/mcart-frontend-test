<template>
  <div>
    Error: <b>{{error.status}}</b> {{error.data.error}}
  </div>
</template>

<script>
export default {
    props: {
        error: {required: true, type: String},
    }

}
</script>

<style>

</style>"