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
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialise,
    getDatabase,
    initializeApp
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
}

/**************************************************************/
// END OF CODE
/**************************************************************/