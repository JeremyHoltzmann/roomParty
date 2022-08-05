export default function (messageList = [], action) {
  if (action.type === "addMessage") {
    var tmpPOI = [...POIList];
    tmpPOI.push(action.message);
    return tmpPOI;
  }
  if (action.type === "clearMessage") {
    return [];
  }
  if (action.type === "setMessageList") {
    return action.array;
  }
  return messageList;
}
