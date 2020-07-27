const axios = require("axios");

const fees = {
    nominal:1,
    percentage:.01
}
const btcConversion = async(usd) => {
    convstr = "https://blockchain.info/tobtc?currency=USD&value=";
    fullconvstr = convstr + usd.toString();
   
  const runit =  axios
                    .get(fullconvstr)
                    .then(res => {return res.data})
                    .catch(err => console.log(err));
    return runit;
   };

const feeDetermine = async(amt) =>{
    if(Number(amt + fees.nominal) > Number(amt + (amt*fees.percentage))){
        const a = amt;
        const b = fees.nominal;
        const c = Number(amt + b);
        const d = await btcConversion(c);
        return [a,b,c,d];
    }else{
        const a = amt;
        const b = Number((amt*fees.percentage).toFixed(2));
        const c = Number((a + b));
        const d = await btcConversion(c);
        return [a,b,c,d];
    }
}


module.exports.feeDetermine = feeDetermine;
module.exports.btcConversion = btcConversion;