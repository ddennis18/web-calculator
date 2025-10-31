let buffer = ""
let N = 0
let prevOpr = "+"
let Ans = 0
let AnsBuffer = 0
let ansText = ""
let displayText = ""
const decimalBtn = document.getElementById("decimal-btn");

const display = document.getElementById("display");
const result_display = document.getElementById("result");

function updateDisplay() {
    display.textContent = displayText
    result_display.textContent = ansText + " = " + Ans
}

//this function handles what happens when a number btn or the Ans button is clicke
function writeNumber(n) {
    if (n === ".") {
        decimalBtn.disabled = true;
    }
    buffer += n;
    displayText = buffer;
    updateDisplay()
}

//set the click handlers for the numbers
document.querySelectorAll(".number-btn").forEach(btn => {
    btn.addEventListener("click", () => { writeNumber(btn.textContent) })
});

//set the click handler for operators
document.querySelectorAll(".operator-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let opr = btn.textContent;
        N = Number(buffer)
        if (prevOpr === "+") {
            Ans = Ans + N
        }
        else if (prevOpr === "-") {
            Ans = Ans - N
        }
        else if (prevOpr === "×") {
            Ans = Ans * N
        }
        else if (prevOpr === "/") {
            Ans = Ans / N
        }

        if (opr === "=") {
            buffer = Ans.toString()
            displayText = buffer
            ansText = Ans
            prevOpr = "+"
            updateDisplay()
            displayText=""
            buffer = ""
            AnsBuffer = Ans;
            Ans = 0
            ansText = ""
            return
        }
        buffer = ""
        ansText += N + " " + opr + " "
        prevOpr = opr
        updateDisplay()
    })
})

//set the click handler for the scientific btn
document.querySelectorAll(".scientific-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let type = btn.id;
        N = Number(buffer)
        if (type === "inv") {
            N = 1 / N;
        } else if (type === "sqr") {
            N = N * N;
        } else if (type === "sqrt") {
            N = Math.sqrt(N);
        }
        buffer = N.toString()
        displayText = N.toString();
        updateDisplay()
    })
})

document.getElementById("ans-btn").addEventListener("click", () => {
    N = AnsBuffer;
    buffer = AnsBuffer.toString();
    displayText = buffer;
    updateDisplay()
})

document.getElementById("clear").addEventListener("click", () => {
    displayText = "";
    buffer = ""
    N = 0
    updateDisplay()
})

document.getElementById("clear-all").addEventListener("click", () => {
    displayText = "";
    Ans = 0
    ansText = ""
    buffer = ""
    N = 0
    updateDisplay()
})

document.getElementById("delete").addEventListener("click", () => {
    if (displayText[displayText.length - 1] === ".") {
        decimalBtn.disabled = false;
    }
    buffer = buffer.slice(0, -1)
    displayText = displayText.slice(0, -1)
    updateDisplay()
})
updateDisplay()