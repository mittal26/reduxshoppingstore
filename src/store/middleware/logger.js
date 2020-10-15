const logger = params => store => next => action => {
    //console.log(params, "Logging");

    next(action)
}

export default logger;