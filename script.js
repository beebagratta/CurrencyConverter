const Base_Url=  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const DropDowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select")
const msg=document.querySelector(".msg");
for (let select of DropDowns){
    for (currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if (select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        } else if (select.name==="to" && currcode==="PKR"){
            newoption.selected="selected";
        };
        select.append(newoption);
    };
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
};
const updateexchangerate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval ==="" || amtval <0){
        amtval=1;
        amount.value="1";
    };
    const URL = `${Base_Url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;   
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[tocurr.value.toLowerCase()];
    let FinalAmount=amtval * rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${FinalAmount} ${tocurr.value}`;
};
const updateflag=(element)=> {
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchangerate();
});
window.addEventListener("load", ()=>{
    updateexchangerate();
});
