import { Response } from "express";

export const badRequest = (res: Response, err: string) => {
    res.status(400).json({
        err: err
    })
}

export const internalServerError = (res: Response, err: Error) => {
    res.status(500).json({
        err: err.message
    })
}

export const notFound = (res: Response) => res.sendStatus(404)
export const ok = (res: Response) => res.sendStatus(200)


export const validateNumber = (num: any) : boolean => (parseFloat(num) > 0)