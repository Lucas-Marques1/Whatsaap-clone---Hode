const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this.init();

    }

    init(){


        if (!window._initializedFirebase) {    
            
            this._firebaseConfig = {
                apiKey: "AIzaSyDjC-G-SsdqhXz8Zt35Lfzwaqscx1FnDMs",
                authDomain: "whatsapp-clone-d9e19.firebaseapp.com",
                databaseURL: "https://whatsapp-clone-d9e19.firebaseio.com",
                projectId: "whatsapp-clone-d9e19",
                storageBucket: "whatsapp-clone-d9e19.appspot.com",
                messagingSenderId: "535169450509",
                appId: "1:535169450509:web:046088e9b05e6729314b44",
                measurementId: "G-QZLTSL311Q"
            };

            firebase.initializeApp(this._firebaseConfig);
            firebase.analytics();

            /*firebase.firestore().settings({
                timestampsInSnapshots: true
            });*/

            window._initializedFirebase = true;
        }
        
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();
                      
            firebase.auth().signInWithPopup(provider)
            .then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                console.log(user, token);

                s({
                    user,
                    token
                });

            })
            .catch(err =>{
                f(err);
            })

        });

    }

}