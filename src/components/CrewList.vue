<template>
 <div>
     <v-list >
          <v-list-tile v-for="item in items" :key="item.title" avatar @click="asdf">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title  :color="item.active ? 'teal' : 'grey'" v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon v-if="item.supervisor" >supervisor_account</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { active: true, title: 'Jason Oner', avatar: '/static/doc-images/lists/1.jpg' },
          { active: true, title: 'Ranee Carlson', avatar: '/static/doc-images/lists/2.jpg' },
          { title: 'Cindy Baker', avatar: '/static/doc-images/lists/3.jpg' },
          { supervisor: true, title: 'Ali Connors', avatar: '/static/doc-images/lists/4.jpg' }
        ],
      }
    },
    methods:{
      asdf(){

      }
    }
  }
</script>