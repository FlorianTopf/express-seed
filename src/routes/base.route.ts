'use strict';

import * as express from 'express';
import * as Promise from 'bluebird';

class BaseRoute {
    public static getInstance(): BaseRoute {
        return new this();
    }

    public indexAction(req: express.Request, res: express.Response, next: express.NextFunction) {
        //render page
        const promise = new Promise((resolve: Function, reject: Function) => {
            const error = false;
            if (error) {
                reject({message: 'Error'});
            } else {
                resolve({message: 'Hello World!'});
            }
        });

        promise
            .then((message: Object) => res.json(message))
            .catch((error: Object) => res.status(500).json(error));
    }
}

export default BaseRoute.getInstance();
