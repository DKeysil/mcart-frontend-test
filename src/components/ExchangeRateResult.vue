<template>
  <div>
      <table>
          <tr>
              <th>Название</th>
              <th>Курс на первую дату</th>
              <th>Курс на вторую дату</th>
              <th>Разница</th>
          </tr>
          <tr>
              <th>{{title}}</th>
              <th>{{first_exchange_rate}}</th>
              <th>{{second_exchange_rate}}</th>
              <th>{{difference}}</th>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
    props: {
        title: {required: true, type: String},
        first_exchange_rate: {required: true, type: Float64Array},
        second_exchange_rate: {required: true, type: Float64Array},
        difference: {required: true, type: Float64Array}
    },

}
</script>

<style>

</style>