import axios from 'axios';
<template>
  <div>
    <h3 class="pa-3">热门课程</h3>
    <v-row>
      <v-col v-for="(item, index) in courses" :key="index" md="4">
        <v-card :to="`courses/${item._id}`" class="mx-auto" max-width="344">
          <v-img :src="item.cover" height="200px"></v-img>

          <v-card-title>
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ item.createdAt }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text>
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn @click="show = !show" icon>
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  // 在上下文中引用了axios
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  }
}
</script>

<style></style>
