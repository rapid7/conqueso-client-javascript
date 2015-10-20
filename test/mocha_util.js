"use strict";

module.exports = {

    // Make sure 'done' gets called whether the async test succeeds or fails
    asyncTest : function ( done, f ){
        try {
            f();
            done();
        } catch( e ) {
            done( e );
        }
    }
}