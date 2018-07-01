<template>
  <v-navigation-drawer id="mainNav" v-model="leftDrawer" :mini-variant="miniVariant" name="SideNav" style="overflow: hidden;" mobile-break-point="464" clipped persistent fixed app>
    <!-- <v-toolbar flat class="transparent" dense>
      <v-list :class="{'list-border-bottom' : miniVariant}" class="pa-0">
    <v-tooltip right>
          <v-list-tile slot="activator" :to="home" exact>
            <v-list-tile-action>
              <v-icon v-html="<img src='@/assets/images/logo.png' style='width:30px; height:30px'>" />
                <img src="@/assets/images/logo.png" style="width:30px; height:30px">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="dashboard" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="dashboard" />
        </v-tooltip>

        <v-list-tile>
          <v-list-tile-action v-if="!miniVariant">
            <img src="@/assets/images/logo.png" style="width:30px; height:30px">

          </v-list-tile-action>
          <v-list-tile-content v-if="!miniVariant">
            <v-list-tile-title style="color: #41B883">
              <h3>Andrews App </h3>
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <img src="@/assets/images/logo.png" style="width:30px; height:30px" @click.stop="">
          <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider/> -->

    <v-tooltip :disabled="!miniVariant" right dense>
      <v-toolbar slot="activator" flat class="transparent" dense>
        <v-list :class="{'list-border-bottom' : miniVariant}" class="pa-0">

          <v-list-tile to="/" exact>
            <v-list-tile-action>
              <!-- <v-icon v-html="<img src='@/assets/images/logo.png' style='width:30px; height:30px'>" /> -->
              <img src="../../assets/logo.png" style="width:30px; height:30px">
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Project Overview</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-toolbar>
      <span>Project Overview</span>
    </v-tooltip>
    <v-divider/>

    <v-list :class="{'list-border-bottom' : miniVariant}" subheader>
      <v-subheader>ANALYTICS</v-subheader>
      <div v-for="item in middleItems" :key="item.id">
        <v-tooltip :disabled="!miniVariant" right>
          <v-list-tile slot="activator" :key="item.icon" :to="item.link" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="item.title" />
        </v-tooltip>
      </div>
    </v-list>
    <v-divider/>

    <v-list subheader>
      <v-subheader>ASSETS</v-subheader>
      <div v-for="item in lastItems" :key="item.id">
        <v-tooltip :disabled="!miniVariant" right>
          <v-list-tile slot="activator" :key="item.icon" :to="item.link" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="item.title" />
        </v-tooltip>
      </div>
    </v-list>
    <v-divider/>
    <v-list subheader>
      <v-subheader>PEOPLE</v-subheader>
      <div v-for="item in topItems" :key="item.id">
        <v-tooltip :disabled="!miniVariant" right>
          <v-list-tile slot="activator" :key="item.icon" :to="item.link" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="item.title" />
        </v-tooltip>
      </div>
    </v-list>
    <v-divider/>
    <v-list subheader>
      <v-subheader>UTILITIES</v-subheader>
      <div v-for="item in utilitiesItems" :key="item.id">
        <v-tooltip :disabled="!miniVariant" right>
          <v-list-tile slot="activator" :key="item.icon" :to="item.link" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="item.title" />
        </v-tooltip>
      </div>
    </v-list>
    <v-spacer></v-spacer>
    <div style="position: relative;
            height: 85%;">

      <div style="position: absolute;
                bottom: 0;
                width: 100%;
                height 100px;
                ">
        <v-tooltip :disabled="!miniVariant" right>
          <v-list-tile slot="activator" :to="settings.link" exact>
            <v-list-tile-action>
              <v-icon v-html="settings.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="settings.title" />
            </v-list-tile-content>
          </v-list-tile>
          <span v-text="settings.title" />
        </v-tooltip>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import AFooter from './AFooter'
  import ComsPanel from './ComsPanel'

  export default {
    name: 'SideNav',
    components: {
      'a-footer': AFooter,
      'coms-panel': ComsPanel
    },
    data: () => {
      return {
        leftDrawer: true,
        miniVariant: true,
        topItems: [{
            icon: 'supervisor_account',
            title: 'Employees',
            link: "/profile"
          },
          // {
          //   icon: 'supervisor_account',
          //   title: 'Applicants',
          //   link: ''
          // }
        ],
        settings: {
            icon: 'settings',
            title: 'Settings',
            link: '/settings'
        },
        middleItems: [
          // {
          //   icon: 'dashboard',
          //   title: 'Dashboard',
          //   link: "/dashboard/dashboard"
          // },
          // {
          //   icon: 'local_shipping',
          //   title: 'Live View',
          //   link: '/liveview/liveview'
          // },
          // {
          //   icon: 'book',
          //   title: 'Schedule',
          //   // link: "/schedule/schedule"
          // }
        ],
        lastItems: [{
            // icon: 'android',
            icon: 'build',
            title: 'Hardware',
            link: '/hardware'
          },
          // {
          //   icon: 'invert_colors',
          //   title: 'Consumables',
          //   link: "/assets/consumables"
          // },
          // {
          //   icon: 'build',
          //   title: 'Maintenance',
          //   // link: "/assets/maintenance"
          // }
        ],
        utilitiesItems: [{
            icon: 'list',
            title: 'Logs',
            link: ''
          },
          // {
          //   icon: 'work',
          //   title: 'Documents',
          //   // link: "/documents"
          // },
          // {
          //   icon: 'comment',
          //   title: 'Notifications',
          //   link: ''
          // }
        ],

        // tabs: null,
        // tabsItems: [
        //   { id: 1, title: "Indicators", link: "indicators" },
        //   { id: 2, title: "Backup", link: "backup" },
        //   { id: 3, title: "Logs", link: "logs" }
        // ]
      }
    },

  }
</script>

<style>
</style>
