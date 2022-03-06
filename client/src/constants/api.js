export const APIURL =
    process.env.NODE_ENV !==
    'production' ?
    ' https://blog-tiny.herokuapp.com/api' :
    'somedeployedUrl'

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit'