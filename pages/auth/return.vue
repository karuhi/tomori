<template>
  <p>callback</p>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/auth/return', {
      params: this.$route.query,
    })
    const user = res.data.user
    this.$store.commit('login', user)
    this.$router.push('/home')
  },
}
</script>
