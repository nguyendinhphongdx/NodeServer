
toJsonWithData = (message, totalResult, data) => {
  return {
    message: message,
    totalResult: totalResult,
    data: data
  };
}

toJsonWithData = (message, data) => {
  let dataArr = []

  if (Array.isArray(data)) {
    dataArr = data.map((item,index) =>{
      return {...item._doc,key:index}
    })
  } else {
    dataArr.push(data)
  }

  return {
    message: message,
    totalResult: dataArr.length,
    data: dataArr
  };
}
toJsonWithArray = (message, data) => {
  
  return {
    message: message,
    totalResult: data.length,
    data: data
  };
}

jsonNoData = (message) => {
  return {
    message: message,
    totalResult: 0,
    data: null
  }
}
toJsonWithObject = (message, data) => {
  return {
    message: message,
    totalResult: 1,
    data: data
  };
}
module.exports = { toJsonWithData, jsonNoData, toJsonWithArray, toJsonWithObject};