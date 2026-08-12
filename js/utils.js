export function createGenerateId(startingId = 0){
    let currentId=startingId;
    return function(){
        currentId++;
        return currentId;
    }
}
export function debounce(callback,delay){
    let timer;
    return function(){
    clearTimeout(timer);
    timer= setTimeout(()=>{callback()},delay);
    }

}