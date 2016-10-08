'use strict';

const DEVELOPMENT_PORT = process.env.PORT || 8090;

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): any {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        //named pipe
        return val;
    }

    if (port >= 0) {
        //port number
        return port;
    }
    return false;
}

//get port from environment
export default normalizePort(DEVELOPMENT_PORT);
