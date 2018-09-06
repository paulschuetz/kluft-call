class HttpError extends Error{
    constructor(message, status){
        super(message);
        this.name = "HttpError";
        status? this.status=status : this.status=200;
    }
}

module.exports= {
    HttpError : HttpError
}