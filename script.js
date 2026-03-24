// Written by Looty9397

const output = document.getElementById("output");
const inputs = {
    "amount": document.getElementById("amount"),
    "payment": document.getElementById("payment"),
    "term": document.getElementById("term")
}

            function makeCell (value, type) {
                let cell = document.createElement(type);
                console.log(value, type)
                cell.innerHTML = value;
                return cell;
            }


document.getElementById("calc").addEventListener("click", function () {
    if (inputs.term.value % 15 === 0) {
        var principalAmount = inputs.amount.value - inputs.payment.value;
        var rate = 0.0575;
        var monthlyPayment = (((rate / 12) * principalAmount) / (1 - Math.pow(1 + (rate / 12), inputs.term.value * 12))).toFixed(2);
        var totalCost = (monthlyPayment * inputs.term.value * 12) - principalAmount; // Somehow the values
        var totalInterest = principalAmount + totalCost; // of these got swapped so the names are now swapped too

        var remainingAmount = Number(principalAmount);
        const schedule = document.getElementById("schedule");
        for (let i = 0; i <= inputs.term.value * 12; i ++) {

            let row = document.createElement("tr");
            if (i > 0) {
                row.appendChild(makeCell(i, "td"));
                row.appendChild(makeCell("$" + Number(-monthlyPayment).toFixed(2), "td"));
                let interestPaid = remainingAmount * (rate / 12);
                let principalPaid = -(monthlyPayment - interestPaid);
                remainingAmount -= principalPaid;
                row.appendChild(makeCell("$" + Number(interestPaid).toFixed(2), "td"));
                row.appendChild(makeCell("$" + Number(principalPaid).toFixed(2), "td"));
                row.appendChild(makeCell("$" + Number(remainingAmount).toFixed(2), "td"));
            } else {
                row.appendChild(makeCell("Month", "th"));
                row.appendChild(makeCell("Payment", "th"));
                row.appendChild(makeCell("Interest", "th"));
                row.appendChild(makeCell("Principal", "th"));
                row.appendChild(makeCell("Remaining Balance", "th"));
            }
            schedule.appendChild(row);
        }

        document.getElementById("outTerm").innerHTML = inputs.term.value + " Years";
        document.getElementById("outRate").innerHTML = "5.75%"
        document.getElementById("outPrincipal").innerHTML = "$" + principalAmount;
        document.getElementById("outInterest").innerHTML = "$" + -totalInterest.toFixed(2);
        document.getElementById("outCost").innerHTML = "$" + -totalCost.toFixed(2);

        document.getElementById("simpleOut").style.display = "table";
        document.getElementById("output").appendChild(makeCell("This ends the Amortization Calculator...", "p"))
    } else {
        document.body.appendChild(makeCell("Invalid Term", "p"))
    }
})