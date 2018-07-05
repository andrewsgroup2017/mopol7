<template>
  <div class="home">
    <img ref="myimage" src="../assets/logo.png">

    <v-btn  @click="takePicture">Success</v-btn>
        <v-btn color="error">Error</v-btn>

    <v-btn @click="scan">asdfasdfdsf</v-btn>
    <v-btn @click="mkdir">make dir</v-btn>
    <v-btn @click="fileWrite">fileREad</v-btn>
    <v-btn @click="fileRead">fileREad</v-btn>
    <video ref="preview" id="preview"></video>

  </div>
</template>

<script>
// @ is an alias to /src
import { Plugins, CameraResultType, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Camera } = Plugins;

export default {
  name: 'home',
  components: {
  },
  methods: {
    async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  // image.webPath will contain a path that can be set as an image src. You can access
  // the original file using image.path, which can be passed to the Filesystem API to
  // read the raw data of the image, if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;
  // can be set to the src of an image now
  this.$refs.myimage.src = imageUrl;
},
async mkdir() {
  try {
  const { Filesystem } = Plugins;
  /* eslint-disable-next-line */
    let ret = await Filesystem.mkdir({
      path: 'andrews',
      directory: FilesystemDirectory.Documents,
      createIntermediateDirectories: false // like mkdir -p
    });
  } catch(e) {
    console.error('Unable to make directory', e);
  }

},
fileWrite() {
  const { Filesystem } = Plugins;
  try {
    Filesystem.writeFile({
      path: 'andrews/andrews.txt',
      data: "BLAHBLAHBLAH",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    })
  } catch(e) {
    console.error('Unable to write file', e);
  }
},
async fileRead() {
  const { Filesystem } = Plugins;

  let contents = await Filesystem.readFile({
    path: 'andrews/andrews.txt',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
  console.log(contents);
},
    async scan() {
 const Instascan = require('instascan');

 let scanner = new Instascan.Scanner({ video: this.$refs.preview });
      scanner.addListener('scan', function (content) {
        console.log(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[1]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
  }
},
}
</script>
