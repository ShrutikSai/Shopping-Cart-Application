import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
    const errs = validationResult(req);
    const mappedErrs = {};

    if (errs.isEmpty()) {
        return next();
    }

    errs.array().forEach((err) => {
        mappedErrs[err.path] = err.msg;
    });

    return res.status(400).json(mappedErrs);
};

export default validate;
