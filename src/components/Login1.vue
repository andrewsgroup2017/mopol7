<template>
  <v-container  fill-height justify-center align-center>
    <div v-show="scanning" class="QRScanner-lock" @click="scanning = false" >......</div>
    <div v-show="scanning" class="QRScanner-container">
      <v-select v-model="camera" placeholder="Choose a camera">
        <v-option v-for="camera in cameras" :key="camera.id" :label="camera.name" :value="camera">
        </v-option>
      </v-select>
      <video id="scanner"></video>
    <v-btn type="danger" style="margin: 20px;" @click="scanning = !scanning" class="button">
    
      <v-icon name="qrcode" scale="2"></v-icon><span >Scan</span>
    </v-btn>

    </div>  

      <video id="scanner"></video>

  </v-container>

</template>
<script>
    import {
        EventBus
    } from '../plugins/event-bus.js'
    import Instascan from 'instascan'
    import Fingerprint2 from 'fingerprintjs2'

    export default {
        data() {
            return {
                scanning: false,
                scanner: null,
                cameras: [],
                ready: false,
                camera: null,
                finished: false,
                location: null,
                fingerprint: null
            };
        },
        beforeCreate() {
            EventBus.$emit('loading-stop');
            Instascan.Camera.getCameras().then((cameras) => {
                this.cameras = cameras;
                if (cameras.length > 0) {
                    this.camera = cameras[0];
                    console.log({
                        message: `found ${cameras.length} cameras`,
                        type: 'success',
                        showClose: true,
                    });
                } else {
                    console.log({
                        message: 'No camera found!',
                        type: 'error',
                        showClose: true,
                    });
                }
            }).catch((e) => {
                console.log({
                    message: 'an Internal error occured',
                    type: 'error',
                    showClose: true,
                    error: e
                });
            });
        },
      async mounted() {
            var lastDeviceUpdateTime = window.localStorage.getItem('deviceInformation').timestamp
            var now = new Date()
            console.log(lastDeviceUpdateTime)
            console.log(now)
            if(lastDeviceUpdateTime - now > 60){
            await Promise.all([  this.location = this.getLocationOfUser(),  this.fingerprint = this.getFingerprint()]);
              var deviceInformation = {}
              deviceInformation.location = this.location
              deviceInformation.fingerprint = this.fingerprint
              deviceInformation.timestamp = new Date()
              window.localStorage.setItem('deviceInformation', deviceInformation)
          }
          

            this.fingerprint = window.localStorage.getItem('fingerprint')
            
            this.ready = true

            EventBus.$emit('loading-stop');

            this.scanner = new Instascan.Scanner({
                video: document.getElementById('scanner'),
            });

            this.scanner.addListener('scan', (result) => {
                console.log(result);
                if (!this.finished) {
                    this.finished = true
                    //put http code back here
                }
            });
        },
        methods: {
            async getFingerprint() {
                const fp = new Fingerprint2().get(function(result, components) {
                    console.log(result) // a hash, representing your device fingerprint
                    console.log(components) // an array of FP components
                    return fp
                })
            },
            async getLocationOfUser() {
                return new Promise(resolve => {
                   
                    var geolocationCallback = function(location) {
                        resolve(location);
                    };
                    if (
                        typeof navigator !== "undefined" &&
                        typeof navigator.geolocation !== "undefined"
                    ) {
                        // log('Asking user to get their location')
                        navigator.geolocation.getCurrentPosition(
                            geolocationCallback,
                            errorHandler
                        );
                    } else {
                        // log(
                        //   'Your browser does not support the HTML5 Geolocation API, so this demo will not work.'
                        // )
                    }
                    var errorHandler = function(error) {
                        if (error.code == 1) {
                            // log('Error: PERMISSION_DENIED: User denied access to their location')
                        } else if (error.code === 2) {
                            // log(
                            //   'Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached'
                            // )
                        } else if (error.code === 3) {
                            // log("Error: TIMEOUT: Calculating the user's location too took long")
                        } else {
                            // log('Unexpected error code')
                        }
                        resolve("error");
                    };
                });
            },
        },
        async test() {
       
        },

        watch: {
            scanning() {
                if (this.scanning === true) {
                    if (this.cameras.length > 0) {
                        this.scanner.start(this.camera);
                    } else {
                        Instascan.Camera.getCameras().then((cameras) => {
                            this.cameras = cameras;
                            if (cameras.length > 0) {
                                this.camera = cameras[0];
                                this.$message({
                                    message: `found ${cameras.length} cameras`,
                                    type: 'success',
                                    showClose: true,
                                });
                                this.scanner.start(this.camera);
                            } else {
                                this.cameras = [];
                                this.camera = null;
                                this.$notify({
                                    message: 'No camera found!',
                                    type: 'error',
                                    showClose: true,
                                });
                            }
                        }).catch((e) => {
                            this.$message({
                                message: 'Camera detection error',
                                type: 'error',
                                showClose: true,
                                error: e
                            });
                        });
                    }
                } else {
                    this.scanner.stop(this.camera);
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            EventBus.$emit('close');
            // TODO: if this code doesn't solve anything we need to omit it
            this.camera = null;
            this.cameras = null;
            this.scanner = null;
            const video = document.getElementById('scanner');
            console.log(video.parentNode);
            video.parentNode.removeChild(video);
            next();
        },
    }
</script>