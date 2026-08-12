export function createGenerateId(startingId = 0){
    let currentId=startingId;
    return function(){
        currentId++;
        return currentId;
    }
}