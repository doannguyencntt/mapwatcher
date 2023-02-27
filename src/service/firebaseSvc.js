import * as firebase from 'firebase'

const configData = {
  apiKey: process.env.VUE_APP_API_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
}

const firebaseSvc = {
  firebase: !firebase.apps.length || !firebase.app('[DEFAULT]') ? firebase.initializeApp(configData) : firebase.app('[DEFAULT]'),
  set setFirebase (cfg) {
    let self = this
    if (firebase.app('[DEFAULT]')) {
      firebase.app('[DEFAULT]').delete().then(function() {
        self.firebase = firebase.initializeApp(cfg)
      })
    } else {
      self.firebase = firebase.initializeApp(cfg)
    }
  },
  get getFirebase () {
    return this.firebase
  },
  get getFirebaseDb () {
    return this.firebase.database()
  }
}

export default firebaseSvc
