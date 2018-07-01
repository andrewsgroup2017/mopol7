<template>
 <v-layout row wrap>

      <v-flex class="mt-5" xs10 offset-xs1 row>
      <v-expansion-panel popout>
        <v-expansion-panel-content
          v-for="(member, i) in members"
          :key="i"
          hide-actions
        >
          <v-layout
            slot="header"
            align-center
            row
            spacer
          >
            <v-flex xs4 sm2 md1 class="mr-4">
              <v-avatar
                slot="activator"
                size="64px"
              >
                <img
                  v-if="member.avatar"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  alt="Avatar"
                >

              </v-avatar>
            </v-flex>

            <v-flex sm4 md2 >
              <strong v-html="member.name"></strong>
              <!-- <span
                v-if="member.total"
                class="grey--text"
              >
                &nbsp;({{ member.total }})
              </span> -->
            </v-flex>


            <v-flex sm3 md1 >
              <v-icon
                  :color="member.color2"
                  v-text="member.located"
                ></v-icon>
            </v-flex>
            <v-flex sm3 md1 >
              <v-icon
                  :color="member.color3"
                  v-text="member.icon"
                ></v-icon>
            </v-flex>
             <v-flex sm2 >
              <v-chip
                v-if="member.new"
                :color="`${member.color} lighten-4`"
                class="ml-0"
                label
                small
              >
                {{ member.new }}
              </v-chip>
              <!-- <strong v-html="member.title"></strong> -->
            </v-flex>
          </v-layout>

          <v-card>
            <v-divider></v-divider>
            <v-card-actions>
          <v-btn flat color="warning">Clock Out</v-btn>
          <v-btn flat color="warning">Make Lead</v-btn>
        </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
        <v-btn class="mt-5" block color="secondary" dark>Add Employee</v-btn>

      </v-flex>

  </v-layout>
</template>
content_copy
<script>
export default {
  data: () => ({
    members: [
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        name: "J. Johnson",
        title: "Welcome",
        color2: "grey",
        icon: "schedule",
        color3: "info",
        located: "pin_drop"
      },
      {
        avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        name: "A. Downing",
        title: "Welcome",
        color2: "grey",
        icon: "schedule",
        color3: "grey",
        located: "pin_drop",
        new: "Lead"
      }
    ],
    lorem:
      "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
  })
};
</script>
<style>
.v-expansion-panel-content {
    padding: 12px 32px;
    height: 46px;
}
.v-expansion-panel__header {
    /* padding: 12px 32px; */
    height: 76px;
}
</style>
