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
import { getDatabase, ref, set, get, update, query, orderByChild, limitToFirst, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialise, fb_authenticate, fb_displayLoginState,
    fb_signOut, fb_writeRec, fb_readRec,
    fb_readAll, fb_updateRec, fb_sortedRead,
    fb_listenForUpdates, fb_randNumSet
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
// Sign out the user from website
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
// Write the user record to the database
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_writeRec() {
    console.log('%c fb_writeRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user signed in');
        document.getElementById("p_fbWriteRec").innerHTML = "Guest doesn't have permission to write";
        document.getElementById("p_fbWriteRec").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = ref(APPDB, 'users/' + AUTH.currentUser.uid);
    set(REF,
        {
            uid: AUTH.currentUser.uid,
            email: AUTH.currentUser.email,
            name: AUTH.currentUser.displayName,
            photoURL: AUTH.currentUser.photoURL,
            providerId: AUTH.currentUser.providerId,
            metadata: AUTH.currentUser.metadata,
            providerData: AUTH.currentUser.providerData
        }).then(() => {
            console.log('User record written');
            document.getElementById("p_fbWriteRec").innerHTML = "Record written";
            document.getElementById("p_fbWriteRec").style.color = 'black';
        }).catch((error) => {
            console.log('Error writing user record: ' + error);
        });

}

/**************************************************************/
// fb_readRec()
// Read a record from the database
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_readRec() {
    console.log('%c fb_readRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user logged in');
        document.getElementById("p_fbReadRec").innerHTML = "Guest doesn't have permission to read";
        document.getElementById("p_fbReadRec").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = ref(APPDB, 'users/' + AUTH.currentUser.uid);
    get(REF).then((snapshot) => {
        let fb_data = snapshot.val();
        if (fb_data != null) {
            console.log('User record read');
            console.log(fb_data);
            document.getElementById("p_fbReadRec").innerHTML = "Record read";
            document.getElementById("p_fbReadRec").style.color = 'black';
        } else {
            console.log('No such user record');
            document.getElementById("p_fbReadRec").innerHTML = "No such user record";
        }
    }).catch((error) => {
        console.log('Error reading user record: ' + error);
    });


}

/**************************************************************/
// fb_readAll()
// Read all records from the database
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_readAll() {
    console.log('%c fb_readAll(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user logged in');
        document.getElementById("p_fbReadAll").innerHTML = "Guest doesn't have permission to read";
        document.getElementById("p_fbReadAll").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = ref(APPDB, 'users');
    get(REF).then((snapshot) => {
        let fb_data = snapshot.val();
        if (fb_data != null) {
            console.log('All records read');
            console.log(fb_data);
            document.getElementById("p_fbReadAll").innerHTML = "Records read";
            document.getElementById("p_fbReadAll").style.color = 'black';
        } else {
            console.log('No records found');
            document.getElementById("p_fbReadAll").innerHTML = "No records found";
        }
    }).catch((error) => {
        console.log('Error reading user records: ' + error);
    });
}

/***********************************************************/
// fb_updateRec()
// Update a record in the database
// Called by button in index.html
// Input: _ref is the reference to the record to be updated
// Output: N/A
/**************************************************************/
function fb_updateRec(_ref, _data) {
    console.log('%c fb_updateRec(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user logged in');
        document.getElementById("p_fbUpdateRec").innerHTML = "Guest doesn't have permission to write";
        document.getElementById("p_fbUpdateRec").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = ref(APPDB, _ref + '/' + AUTH.currentUser.uid);
    update(REF, _data).then(() => {
        console.log('Record updated');
        document.getElementById("p_fbUpdateRec").innerHTML = "Record updated";
        document.getElementById("p_fbUpdateRec").style.color = 'black';
        get(REF).then((snapshot) => {
            console.log(snapshot.val());
        }).catch((error) => {
            console.log('Error reading record: ' + error);
        })
    }).catch((error) => {
        console.log('Error updating record: ' + error);
    });
}

/***********************************************************/
// fb_sortedRead()
// Read records from the database after sorting
// Called by button in index.html
// Input: _sortKey is the key to sort by, _readNum is the number of records to read
// Output: N/A
/**************************************************************/
function fb_sortedRead(_sortKey, _readNum) {
    console.log('%c fb_sortedRead(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user logged in');
        document.getElementById("p_fbReadSorted").innerHTML = "Guest doesn't have permission to read";
        document.getElementById("p_fbReadSorted").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = query(ref(APPDB, 'users'), orderByChild(_sortKey), limitToFirst(_readNum));
    get(REF).then((snapshot) => {
        console.log(snapshot.val());
        document.getElementById("p_fbReadSorted").innerHTML = `First ${_readNum} records read by ${_sortKey}`;
        document.getElementById("p_fbReadSorted").style.color = 'black';
    }).catch((error) => {
        console.log('Error reading records: ' + error);
    });
}

/**************************************************************/
// fb_listenForUpdates()
// Listen for updates to a record
// Called by button in index.html
// Input: N/A
// Output: N/A
/**************************************************************/
function fb_listenForUpdates() {
    console.log('%c fb_listenForUpdates(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    if (AUTH.currentUser === null) {
        console.log('No user logged in');
        document.getElementById("p_fbListen").innerHTML = "Guest doesn't have permission to read";
        document.getElementById("p_fbListen").style.color = 'red';
        return;
    }

    const APPDB = getDatabase();
    const REF = ref(APPDB, 'rand');
    onValue(REF, (snapshot) => {
        var fb_data = snapshot.val();
        console.log(fb_data);
        document.getElementById("p_fbListen").innerHTML = `Latest value is ${fb_data.randNum}`;
        document.getElementById("p_fbListen").style.color = 'black';
    }, (error) => {
        console.log('Error reading records: ' + error);
    });
}

function fb_randNumSet() {
    console.log('%c f_randNumSet(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const APPDB = getDatabase();
    const REF = ref(APPDB, 'rand/');
    set(REF, { randNum: Math.random() });
}

/**************************************************************/
// END OF CODE
/**************************************************************/