'use strict';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';

import port from './configs/port.config';
import {onServerError, onServerListening} from './handler/server.handler';
import {onRequestNotFound, onRequestErrorDev, onRequestErrorProd} from './handler/requestError.handler';
import router from './app.router';

class AppServer {
    public app: express.Express;

    private http: http.Server;

    public static getInstance(): AppServer {
        return new this();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.initConfigs();

        //use router middleware
        this.app.use(router);

        //init request error handler
        this.initRequestErrorHandler();

        //create http server
        this.http = http.createServer(this.app);

        //listen on provided ports
        this.http.listen(port);

        //add error handler
        this.http.on('error', onServerError);

        //add listening handler
        this.http.on('listening', onServerListening);
    }

    public getServerAddress() {
        return this.http.address();
    }

    private initConfigs() {
        //set express port according to config
        this.app.set('port', port);

        //mount logger
        this.app.use(logger('dev'));

        //mount cookie parser
        this.app.use(cookieParser());

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initRequestErrorHandler() {
        //catch 404 and forward to error handler
        this.app.use(onRequestNotFound);

        //development error handler
        if (this.app.get('env') === 'development') {
            this.app.use(onRequestErrorDev);
        }

        //production error handler
        //no stacktraces leaked to user
        this.app.use(onRequestErrorProd);
    }
}

export default AppServer.getInstance();
