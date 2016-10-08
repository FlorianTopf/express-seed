'use strict';

import {Request, Response, NextFunction} from 'express';

export function onRequestErrorDev(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err,
    });
}

export function onRequestErrorProd(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
    });
}

export function onRequestNotFound(req: Request, res: Response, next: NextFunction) {
    const error: any = new Error('Not Found');
    error.status = 404;
    next(error);
}
