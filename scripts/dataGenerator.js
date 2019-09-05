/**
 * This will export functions that returns set of data and timestamp
 * return timeStamp, true/false if the person is in the room
 */
const postDataScript = require("../dataendpoints/postdata")
function firstDataSet(){
  var obj = {
       timeStamp : new Date().toUTCString(),
       isDataTrue : Boolean(Math.round(Math.random()))
   };
   /**
    * @param {obj} payload  the data to be sent
    * @param {sting} dataendpoint  or the url
    */
   postDataScript.postDataToEndPoint(obj,"/dataForField1");
   console.log(obj);
}
module.exports={
    firstDataSet
};