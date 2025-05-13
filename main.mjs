/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by Idrees Munshi, Term 2 2025
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import {
    fb_initialise, fb_authenticate, fb_displayLoginState,
    fb_signOut, fb_writeRec, fb_readRec, 
    fb_readAll, fb_updateRec, fb_sortedRead,
    fb_listenForUpdates, fb_randNumSet, fb_deleteRec, 
    fb_numberUpdateRec, fb_listenForNumberUpdate, fb_wreakHavoc
}
    from './fb_io.mjs';


// Display relevant functions to the window
window.fb_initialise = fb_initialise;
window.fb_authenticate = fb_authenticate;
window.fb_displayLoginState = fb_displayLoginState;
window.fb_signOut = fb_signOut;
window.fb_writeRec = fb_writeRec;
window.fb_readRec = fb_readRec;
window.fb_readAll = fb_readAll;
window.fb_updateRec = fb_updateRec;
window.fb_sortedRead = fb_sortedRead;
window.fb_listenForUpdates = fb_listenForUpdates;
window.fb_randNumSet = fb_randNumSet;
window.fb_deleteRec = fb_deleteRec;
window.fb_numberUpdateRec = fb_numberUpdateRec;
window.fb_listenForNumberUpdate = fb_listenForNumberUpdate;
window.fb_wreakHavoc = fb_wreakHavoc;

setInterval(() => {
    console.log('RAND NUM SET');
    fb_randNumSet();
}, 3000);

// Listen for updates to the number
fb_listenForNumberUpdate();

/**************************************************************/
// index.html main code
/**************************************************************/

/**************************************************************/
//   END OF CODE
/**************************************************************/
