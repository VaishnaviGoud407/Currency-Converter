

let fromcurr=document.querySelector(".from select");
let tocurr=document.querySelector(".to select");
let dropdowns = document.querySelectorAll(".selector select");
const btn=document.querySelector("button");
let inputValue=document.querySelector(".amountValue");
let finalmsg=document.querySelector("#msg");
for (let select of dropdowns) {
    for (code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;
        if (select.name === "from" && code === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let code = element.value;
    let countrycode = countryList[code];
    
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let newflag = element.parentElement.querySelector("img");
    newflag.src = newsrc;
}
const showresult=(finalammount)=>{
   finalmsg.innerText=`${inputValue.value} ${fromcurr.value} = ${finalammount} ${tocurr.value}`;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amtVal=document.querySelector(".amount input");
    let ammount=amtVal.value;
    if(ammount===""||ammount<1){
        ammount=1;
        amtVal.value=1;
    }
    // console.log(fromcurr.value, tocurr.value);
    const url=`https://api.exconvert.com/fetchOne?from=${fromcurr.value}&to=${tocurr.value}&amount=1&access_key=41d6772c-b816a6eb-688c1919-21cc9b62`;
    let response= await fetch(url);
    let data=  await response.json();
    let resultValue=data.result[tocurr.value];
    let finalammount=resultValue*inputValue.value;
    
     showresult(finalammount);
})