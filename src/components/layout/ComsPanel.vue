<template>
  <v-navigation-drawer
    :v-model="rightDrawer"
    temporary
    fixed
    app>
    <v-toolbar-title>Notifications</v-toolbar-title>
    <v-spacer/>
    <v-btn
      icon
      @click.stop="rightDrawer = false">
      <v-icon>close</v-icon>
    </v-btn>
    <v-list
      subheader
      dense>
      <v-subheader>All notifications</v-subheader>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>person_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          12 new users registered
        </v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>data_usage</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          DB overloaded 80%
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'ComsPanel',
  props: {
    rightDrawer: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {}
  },
}
</script>
