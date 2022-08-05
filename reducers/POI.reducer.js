export default function (POIList = [], action) {
  console.log("🚀 ~ file: POI.reducer.js ~ line 2 ~ action", action);
  if (action.type === "setPOI") {
    var tmpPOI = [...POIList];
    tmpPOI.push(action.POI);
    console.log("🚀 ~ file: POI.reducer.js ~ line 6 ~ tmpPOI", tmpPOI);
    return tmpPOI;
  } else if (action.type === "removePOI") {
    var tmpPOI = [...POIList];

    return POIList.filter((element) => element.title != action.title);
  }
  return POIList;
}
