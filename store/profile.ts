export const state = () => ({
    profile: []
  })
  
  export const mutations = {
    UPDATE_PROFILE (state: any, payload: Array<object>) {
      state.profile =[...payload] 
    }
  }
  
  export const actions = {
    saveProfile (context: any, payload: Array<object>) {
      context.commit('UPDATE_PROFILE', payload)
    }
  }