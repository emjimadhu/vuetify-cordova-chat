import firebase from 'firebase'
import consts from '@/utils/consts'

firebase.initializeApp(consts.firebase)

export const fb = () => firebase
