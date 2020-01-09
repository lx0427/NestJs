<template>
  <div class="pa-3">
    <h3>课程详情</h3>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.title, value: i }))"
    ></v-select>
    <v-row class="d-flex justify-center">
      <video :src="episode.file" controls></video>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: {
          populate: 'episodes'
        }
      }
    })
    return {
      id,
      course
    }
  }
}
</script>
