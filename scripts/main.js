// alert("main.js connected");

//SECTION - GLOBAL DECLARATION AND FUNCTIONS
let phnumbToCopy;
let savedCallLog = [];

function processCopyRequest(element) {
  // console.log(element.parentElement.parentElement.children);
  const serviceName = element.parentElement.parentElement.children[1].innerText;
  const serviceNumb = element.parentElement.parentElement.children[3].innerText;
  phnumbToCopy = serviceNumb;

  navigator.clipboard.writeText(phnumbToCopy)
  alert("👍" + serviceNumb + " (" +serviceName+") has been copied to memory.");
  
  const dispCopyCounter = document.getElementById("disp-copy-counter");
  if (dispCopyCounter) {
    dispCopyCounter.innerText = Number(dispCopyCounter.innerText) + 1;
    return true;
  } else return false;
}

function getCallingCoinBal() {
  const elem = document.getElementById("disp-coin-counter");
  if (elem) return Number(elem.innerText);
  else return false;
}

function reduceCallingCoinBal() {
  const elem = document.getElementById("disp-coin-counter");
  if (elem) {
    elem.innerText = Number(elem.innerText) - 20;
    return true;
  } else return false;
}

function clearCallLog() {
  savedCallLog = [];
  return true;
}

function clearCallHistory() {
  const elem = document.getElementById("call-records");
  if (elem) {
    elem.innerHTML = "";
    return true;
  } else return false;
}

function updateCallHistory(recipient, number, timestamp) {
  const hh = timestamp.getHours();
  const mm = timestamp.getMinutes();
  const ss = timestamp.getSeconds();

  let when = `${hh % 12}:${mm}:${ss}`;
  hh > 12 ? (when = when + " PM") : (when = when + " AM");

  const callRec = {
    callTo: recipient,
    callNum: number,
    callTime: when,
  };
  // console.log (callRec);
  savedCallLog.unshift(callRec);
  return true;
}

function publishCallHistory() {
  clearCallHistory();
  const wrapper = document.getElementById("call-records");
  if (wrapper) {
    for (const c of savedCallLog) {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
              <div class="sm:flex sm:justify-between sm:items-center sm:gap-2 space-y-3 bg-[#fafafa] p-4 rounded-lg">
              <div>
                <h3 class="font-semibold text-[#111111]">${c.callTo}</h3>
                <p class="mt-1 text-[#5c5c5c] text-lg">${c.callNum}</p>
              </div>
              <p class="text-[#111111] text-lg sm:text-right">${c.callTime}</p>
            </div>
            `;
      wrapper.appendChild(newDiv);
    }
    return true;
  } else return false;
}

function processCallRequest(element) {
  if (getCallingCoinBal() < 20) {
    alert("❌ Failed initiating the call due to insufficient coins; need 20 🪙 at the least.");
    return false;
  } else {
    // console.log(element.parentElement.parentElement.children);
    const serviceName =
      element.parentElement.parentElement.children[1].innerText;
    const serviceNumb =
      element.parentElement.parentElement.children[3].innerText;
    const callDateTime = new Date();

    alert("📞 Calling " + serviceName + " at " + serviceNumb + " in progress...");
    reduceCallingCoinBal();
    updateCallHistory(serviceName, serviceNumb, callDateTime);
    publishCallHistory();
    return true;
  }
}

function processAddtoFavRequest(element) {
  const dispFavrCounter = document.getElementById("disp-favr-counter");
  if (dispFavrCounter) {
    if (element.innerHTML.includes("fa-regular")) {
      dispFavrCounter.innerText = Number(dispFavrCounter.innerText) + 1;
      element.innerHTML = `<div><i class="fa-solid fa-heart"></i></div>`;
    } else {
      dispFavrCounter.innerText = Number(dispFavrCounter.innerText) - 1;
      element.innerHTML = `<div><i class="fa-regular fa-heart"></i></div>`;
    }
    return true;
  } else return false;
}
//!SECTION global declarations and functions

//SECTION - EVENT LISTENERS
const btnCopyPhnum = document.getElementsByClassName("btn-copy-phnum");
if (btnCopyPhnum) {
  for (const elem of btnCopyPhnum) {
    elem.addEventListener("click", function (e) {
      // alert("Copying");
      processCopyRequest(elem);
    });
  }
}

const btnCallEmerg = document.getElementsByClassName("btn-call-emerg");
if (btnCallEmerg) {
  for (const elem of btnCallEmerg) {
    elem.addEventListener("click", function (e) {
      // alert("Caling")
      processCallRequest(elem);
    });
  }
}

const btnClearCallrec = document.getElementById("btn-clear-callrec");
if (btnClearCallrec) {
  btnClearCallrec.addEventListener("click", function (e) {
    // alert ("Clear calllog");
    clearCallHistory();
    clearCallLog();
  });
}

const cmdAddtoFav = document.getElementsByClassName("cmd-addto-fav");
if (cmdAddtoFav) {
  for (const elem of cmdAddtoFav) {
    elem.addEventListener("click", function (e) {
      // alert("Add to fav");
      processAddtoFavRequest(elem);
    });
  }
}
//!SECTION event listeners
