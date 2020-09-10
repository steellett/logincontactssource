import firebase from 'firebase/app'
export default {
    state: {
        userEmail: '',
        userData: {},
    },
    mutations: {
        SET_USER_EMAIL: (state, email) => {
            state.userEmail = email
        },
        SET_USER_DATA: (state, userData) => {
            state.userData = userData
        },
        SET_NEW_CONTACT: (state, newContact) => {
            state.userData.contacts.push(newContact)
        }
    },
    actions: {
        /* eslint-disable */
        async login({
            dispatch,
            commit
        }, {
            email,
            password
        }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('SET_USER_EMAIL', email)
            } catch (e) {
                throw (e)
            }
        },
        async registration({
            commit
        }, {
            email,
            password
        }) {
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('SET_USER_EMAIL', user.email);
                return user;
            } catch (e) {
                throw (e)
            }
        },
        async GET_USER_DATA({
            commit
        }, {
            email,
        }) {
            try {
                let userData = await firebase.database().ref();
                userData.on("value", function(snapshot) {
                    let usersData = snapshot.val();
                    for (const user of usersData.profiles) {
                        if (user.email === email) {
                            let currentUserData = user
                            commit('SET_USER_DATA', currentUserData);
                            break;
                        }
                    }
                }, function(error) {
                    console.log("Error: " + error.code);
                });
                return userData;
            } catch (e) {
                throw (e)
            }
        },
        async UPDATE_DATABASE({
            dispatch,
            commit
        }, {
            userData,
            id
        }) {
            console.log(id)
            console.log(userData)
            try {
                let database = await firebase.database().ref(`profiles/${id - 1}`);
                database.update(userData)
            } catch (e) {
                console.log(e)
            }
        }

        /* eslint-enable */
    },
    getters: {
        USER_EMAIL(state) {
            return state.userEmail
        },
        USER_DATA(state) {
            return state.userData
        }

    },
}