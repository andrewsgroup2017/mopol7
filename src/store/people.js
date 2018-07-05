import firebase from './firebase'
const db = firebase.firestore()

const state = {
  all: [],
  crews: [],
  allIds: [],
}

const mutations = {
  SET_CREWMEMBER(state, { crewMember }) {
    const now = new Date()
    state.all = {
      ...state.all,
      [crewMember.id]: {
        userId: crewMember.data().userId,
        deviceId: crewMember.data().deviceId,
        photoURL: crewMember.data().photoURL,
        userUID: crewMember.data().userUID,
        lead: crewMember.data().lead,
        createdAt: now.toString(),
        online: true,
        clockedIn: false,
      },
    }
    state.allIds.push(crewMember.id)
  },
}

const actions = {
  async getCrewMembers({ commit, rootState }, deviceId) {
    // let crewRef = rootState.db.collection('crews')
    let crewRef = db.collection('crews/'+deviceId+'/members')

    let crews = await crewRef.get()
    crews.forEach(crewMember => {
        commit('SET_CREWMEMBER', {crewMember })

    })
  },

async addCrewmember({ commit, rootState }) {
    // let crewRef = rootState.db.collection('crews')
    let crewRef = db.collection('crews')
    let crews = await crewRef.get()
    // console.log(crewMember)
    crews.forEach(crewMember => commit('SET_CREWMEMBER', { crewMember }))
  }
}

const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
