/**
 * This will export functions that returns set of data and timestamp
 * return timeStamp, true/false if the person is in the room
 */
function firstDataSet(){
  var obj = {
       timeStamp : new Date().toUTCString(),
       isDataTrue : Boolean(Math.round(Math.random()))
   };
   console.log(obj);
}
module.exports={
    firstDataSet
};