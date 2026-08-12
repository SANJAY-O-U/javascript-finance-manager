let CURRENCY_API="https://open.er-api.com/v6/latest/USD"

export async function getCurrencyRates(){
    const response= await fetch(CURRENCY_API);
    if(!response.ok){
        throw new Error("Something is broken");
    }
    const data = await response.json();
    return data.rates;
}