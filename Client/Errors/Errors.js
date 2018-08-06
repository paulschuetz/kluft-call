var Promise = require("bluebird");

export class UnsuccessfulRequestError extends Promise.OperationalError{
  constructor(...args){
    super(...args)
  }
}

export class NetworkError extends Promise.OperationalError{
  constructor(...args){
    super(...args)
  }
}
