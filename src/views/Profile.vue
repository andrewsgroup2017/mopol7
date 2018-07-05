<template>
  <div>
    <div>
      Welcome {{ user.email }}<br/>
      <a href="javascript:;" class="btn btn-link" @click="logout">Logout</a>
      <div class="row">
        <div class="col-sm-4 col-sm-offset-4">
          <form action="" accept-charset="utf-8" class="form-inline" @submit.prevent="addPhoto">
            <div class="form-group">
              <label for="photo">
                Upload file
                <input id="elemFileUpload" type="file" class="form-control" @change="fileUploadChange"/>
              </label>
              <input type="submit" name="Submit" class="btn btn-primary">
            </div>
          </form>
          <br/>
          <br/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            Edit Profile
          </div>
          <div class="panel-body">
            <div class="row">
              <!-- left column -->
              <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="text-center">
                  <img :src="user.photoURL" class="avatar img-circle img-thumbnail" alt="avatar" />
                  <div v-if="isProfileEditMode">
                    <h6>Upload a different photo...</h6>
                    <input type="file" class="text-center center-block well well-sm" @change="fileUploadChange" />
                  </div>
                </div>
              </div>
              <!-- edit form column -->
              <div class="col-md-8 col-sm-6 col-xs-12 personal-info">

                <!-- Verify email alert -->
                <div v-if="!user.emailVerified" class="alert alert-info alert-dismissable clearfix">
                  <a class="panel-close close" data-dismiss="alert">×</a>
                  <i class="fa fa-coffee"></i>
                  Your Email is not verified!
                  <button class="btn btn-success pull-right" @click="verifyEmail">Verify Now</button>
                </div>

                <h3 class="text-left">
                  Personal info
                  <button class="btn btn-link" @click="toggleProfileEdit"><i class="glyphicon glyphicon-pencil"></i></button>
                </h3>

                <form class="form-horizontal" role="form" @submit.prevent="updateProfile">
                  <div class="form-group">
                    <label class="col-lg-1 control-label">Name</label>
                    <div class="col-lg-8">
                      <input :disabled="!isProfileEditMode" v-model="profile.displayName" class="form-control" type="text" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-1 control-label">Email:</label>
                    <div class="col-lg-8">
                      <input :disabled="!isProfileEditMode" v-model="profile.email" class="form-control" type="text" />
                    </div>
                  </div>
                  <div v-if="isProfileEditMode" class="form-group">
                    <div class="col-md-6 pull-right">
                      <input class="btn btn-primary" value="Save Changes" type="submit">
                      <span></span>
                      <input class="btn btn-default" value="Cancel" type="reset">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import auth from '../firebase'/
  import { mapGetters } from 'vuex'
// import storage from '../../store/firebase'
  export default {
    data () {
      return {
        // user: this.$store.getters.user,
        isProfileEditMode: false,
        profile: {
          // displayName: this.user.displayName,
          // email: this.$store.getters.user.email,
          // photoURL: this.$store.getters.user.photoURL,
          newPhoto: {
            file: {}
          }
        }
      }
    },
      computed: {
      ...mapGetters({
        message: 'common/message',
        user: 'common/user'
      }),
      },
    methods: {
      addPhoto(){
        var vm = this
        let file = {}
        file.completed = function(url){
          console.log(url)
          vm.user.updateProfile({
  // displayName: "Jane Q. User",
  photoURL: url
}).then(function() {
  // Update successful.
  console.log('profile updated')
}).catch(function(error) {
  // An error happened.
  console.log(error)
})
        }
         file.file = this.profile.newPhoto.file
        file.ref = 'images/' + this.user.uid
        this.$store.commit('storage/uploadFile', file)

        // this.$store.state.storage.commit('uploadFile', file)
      },
// //          var storageRef = this.$store.storage.ref()
// //          var mountainImagesRef = storageRef.child('images/profile_pics/'+this.user.displayName)
// // var metadata = {
// //   contentType: 'image/jpeg'
// // }
// // var uploadTask = storageRef.child('images/' + file.name).put(file, metadata)
// // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
// //   function(snapshot) {
// //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
// //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
// //     console.log('Upload is ' + progress + '% done')
// //     switch (snapshot.state) {
// //       case firebase.storage.TaskState.PAUSED: // or 'paused'
// //         console.log('Upload is paused')
// //         break
// //       case firebase.storage.TaskState.RUNNING: // or 'running'
// //         console.log('Upload is running')
// //         break
// //     }
//   }, function(error) {
//   switch (error.code) {
//     case 'storage/unauthorized':
//       console.log('unauthorized')
//       break
//     case 'storage/canceled':
//       console.log('canceled')
//       break
//     case 'storage/unknown':
//       console.log('unknown')
//       break
//   }
// }, function() {
//   // Upload completed successfully, now we can get the download URL
//   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//     console.log('File available at', downloadURL)
//   })
// })
//       // this.$store.stora/ge.uploadFile(file)
//       },
      fileUploadChange (e) {
        let file = e.target.files[0]
        this.profile.newPhoto.file = file
      },
      updateProfile () {
        let file = this.profile.newPhoto.file
        this.$store.auth.fileUpload(file, '/images', (err, res) => {
          if (err) {
            alert('Some error occurred!')
            console.log(err)
            return
          }
          this.profile.photoURL = res
          this.$store.dispatch('PROFILEUPDATE', this.profile)
        })
      },
      toggleProfileEdit () {
        this.isProfileEditMode = !this.isProfileEditMode
      },
      logout () {
        this.$store.dispatch('LOGOUT')
      },
      verifyEmail () {
        auth.verifyEmail((err, success) => {
          if (err) {
            alert(err)
            return
          }
          console.log(success)
        })
      }
    }
  }
</script>

<style type="text/css" media="screen">
  .p-0{
    padding: 0;
  }
  label{
    text-align: left;
    display: block;
  }
</style>