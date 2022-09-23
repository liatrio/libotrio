var size
var db = Array(size);
for(var i = 0;i<size;i++){
    db[i] = Array();
}
function isFloat(number){
    return Number(number) && number%1==0;
}

function insert_into(table, query) {
    var len = length(query);
    if(len==3 && Number.isInteger(query[1]) && isFloat(query[2]));
    var newlen = db.push(query);
    if (newlen==len+1){
        return true;
    }
    return false;
}
  
  module.exports = {
    insert_into
  };
  