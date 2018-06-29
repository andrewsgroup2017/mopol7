<template>
 <div>
   <CrewList></CrewList>
   <AddCrew></AddCrew>
  </div>
</template>
<script>
import CrewList from '../components/CrewList'
import AddCrew from '../components/AddCrew'

  export default {
    components: {CrewList, AddCrew},
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