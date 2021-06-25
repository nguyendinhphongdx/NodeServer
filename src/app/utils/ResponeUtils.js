const HistoryService = require("../service/HistoryService")
const HistoryModel = require("../Models/HistoryModel");
/**
 * https://xuanduy1412.wordpress.com/2009/11/21/cac-ma-loi-html-request/
 * https://viblo.asia/p/tim-hieu-ve-http-status-code-lA7GKwx5GKZQ
 */
error422 = (res, jsonMessage) => {
  return res.status(422).json(jsonMessage)
}

error400 = (res, jsonMessage) => {
  const request = res.req;
  const user = request.decoded?request.decoded.user.user_name:'login';
  const _remoteAddress = request._remoteAddress;
  const path = request.originalUrl;
  HistoryService.pushHistory(user,jsonMessage.message,400,_remoteAddress,path)
  return res.status(400).json(jsonMessage)
}

error404 = (res, jsonMessage) => {
  const request = res.req;
  const user = request.decoded?request.decoded.user.user_name:'login';
  const _remoteAddress = request._remoteAddress;
  const path = request.originalUrl;
  HistoryService.pushHistory(user,jsonMessage.message,404,_remoteAddress,path)
  return res.status(404).json(jsonMessage)
}

error401 = (res, jsonMessage) => {
  const request = res.req;
  const user = request.decoded?request.decoded.user.user_name:'login';
  const _remoteAddress = request._remoteAddress;
  const path = request.originalUrl;
  HistoryService.pushHistory(user,jsonMessage.message,401,_remoteAddress,path)
  return res.status(401).json(jsonMessage)
}

error500 = (res) => {
  return res.status(500).json({
    message: "url error",
    totalResult: 0,
    data: null
  })
}

success200 = (res, jsonMessage) => {
  console.log(">>> success 200");
  //res.req.decoded.user.user_name  res.req.method   _remoteAddress   _parsedOriginalUrl.pathname
  const request = res.req;
  const user = request.decoded?request.decoded.user.user_name:'login';
  const _remoteAddress = request._remoteAddress;
  const path = request.originalUrl;
  HistoryService.pushHistory(user,jsonMessage.message,200,_remoteAddress,path)
  return res.status(200).json(jsonMessage);
}

module.exports = { error422, error400, error401, error500, success200 }