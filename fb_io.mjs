//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Idrees Munshi, Term 2 2025
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


/**************************************************************/
// This is the configuration for my firebase app
/**************************************************************/
const FB_CONFIG = {
    apiKey: "AIzaSyCkKH0pJ-Fo9axQNsBswxIwZyuruG1X6ts",
    authDomain: "comp-2025-idrees-munshi-24d0e.firebaseapp.com",
    databaseURL: "https://comp-2025-idrees-munshi-24d0e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "comp-2025-idrees-munshi-24d0e",
    storageBucket: "comp-2025-idrees-munshi-24d0e.firebasestorage.app",
    messagingSenderId: "811934625308",
    appId: "1:811934625308:web:a1ff1ffffdcab01bcd79d9",
    measurementId: "G-7P3VZN9ZFD"
};

const FB_APP = initializeApp(FB_CONFIG);
console.log('%c FIREBASEAPP: ' + FB_APP,
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');

const FB_APPDB = getDatabase(FB_APP);
console.info('%c FIREBASEAPPDB: ' + FB_APPDB,
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');


/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialise, fb_authenticate, fb_displayLoginState,
    fb_signOut, fb_writeRec
};

/**************************************************************/
// fb_initialise()
// Initialise database (firebase) connection
// Called by button in index.html
// Inut:N/A
// Output: N/A
/**************************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    document.getElementById("p_fbInitialise").innerHTML = "Initialised";
}

/**************************************************************/
// fb_authenticate()
// Authenticate user using google account
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_authenticate() {
    console.log('%c fb_authenticate(): ',   
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const FB_AUTH = getAuth();
    const FB_PROVIDER = new GoogleAuthProvider();
    // Make google ask user to select account
    FB_PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    // Sign in with a popup window
    // This will open a new window for the user to sign in with their google account
    signInWithPopup(FB_AUTH, FB_PROVIDER).then((result) => {
        document.getElementById("p_fbAuthenticate").innerHTML = "Authenticated";
        console.log(result.user.email);
        console.log(result.user.uid);
    }).catch((error) => {
        console.log('error to authenticate: ' + error);
    });
}

/**************************************************************/
// fb_displayLoginState()
// Display the login state of the user
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_displayLoginState() {
    console.log('%c fb_displayLoginState(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const FB_AUTH = getAuth();
    onAuthStateChanged(FB_AUTH, (user) => {
        if (user) {
            console.log('User is signed in: ' + user.email);
            document.getElementById("p_fbLogin").innerHTML = "Logged in as " + user.displayName;
        } else {
            console.log('User is signed out');
            document.getElementById("p_fbLogin").innerHTML = "Not logged in";
        }
    });
}

/**************************************************************/
// fb_signOut()
// Sign out the user from firebase
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_signOut() {
    console.log('%c fb_signOut(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const FB_AUTH = getAuth();
    signOut(FB_AUTH).then(() => {
        console.log('User signed out');
        document.getElementById("p_fbLogin").innerHTML = "Not logged in";
    }).catch((error) => {
        console.log('Error signing out: ' + error);
    });
}

/**************************************************************/
// fb_writeRec()
// Write a record to the database
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_writeRec() {
    console.log('%c fb_writeRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    const FB_APPDB= getDatabase();
    const REF = ref(FB_APPDB, 'users/' + AUTH.currentUser.uid);
    set(REF, {uid: AUTH.currentUser.uid, email: AUTH.currentUser.email, name: AUTH.currentUser.displayName}).then(() => {
        console.log('User record written');
    }).catch((error) => {
        console.log('Error writing user record: ' + error);
    });
    document.getElementById("fb_writeRec").innerHTML = "Record written";
}

/**************************************************************/
// END OF CODE
/**************************************************************/