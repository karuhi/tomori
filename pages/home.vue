<template>
  <div>
    <h1>Home</h1>
    <p>steamid:{{ $store.state.user._json.steamid }}</p>
    <p>
      communityvisibilitystate:{{
        $store.state.user._json.communityvisibilitystate
      }}
    </p>
    <p>profilestate:{{ $store.state.user._json.profilestate }}</p>
    <p>personaname:{{ $store.state.user._json.personaname }}</p>
    <p>lastlogoff:{{ $store.state.user._json.lastlogoff }}</p>
    <p>personastate:{{ $store.state.user._json.personastate }}</p>
    <p>{{ $store.state.user._json.personastate == 0 ? 'Offline' : ' ' }}</p>
    <p>{{ $store.state.user._json.personastate == 1 ? 'Online' : ' ' }}</p>
    <p>{{ $store.state.user._json.personastate == 2 ? 'Busy' : ' ' }}</p>
    <p>{{ $store.state.user._json.personastate == 3 ? 'Away' : ' ' }}</p>
    <p>{{ $store.state.user._json.personastate == 4 ? 'Snooze' : ' ' }}</p>
    <p>
      {{ $store.state.user._json.personastate == 5 ? 'looking to trade' : ' ' }}
    </p>
    <p>
      {{ $store.state.user._json.personastate == 6 ? 'looking to play' : ' ' }}
    </p>
    <p>id:{{ $store.state.user.id }}</p>
    <p>displayName:{{ $store.state.user.displayName }}</p>
    <br />
    <a href="/api/auth/logout" class="button--green">Logout</a>
    <button @click="getPersonaState">get personastate</button>
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    // 未認証の場合、リダイレクトする
    if (!store.state.auth) {
      return redirect('/')
    }
  },
  methods: {
    getPersonaState() {
      // [WIP] TODO: serverMiddlewareにAPIつくる
      const res = this.$axios.get('/api/steam/GetPlayerSummaries', {
        params: {
          steamid: this.$store.state.user.id,
        },
      })
    },
  },
}
</script>
