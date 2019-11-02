document.querySelector("#loan-form").addEventListener("submit", function(e) {
  document.querySelector("#loading").style.display = "block";
  document.querySelector("#results").style.display = "none";

  setTimeout(calculate, 1000);
  e.preventDefault();
});

function calculate() {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPay = document.querySelector("#monthly");
  const totalPay = document.querySelector("#total-pay");
  const totalInt = document.querySelector("#total-int");

  const principal = parseFloat(amount.value);
  const calcInt = parseFloat(interest.value) / 100 / 12;
  const calcPay = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calcInt, calcPay);
  const monthly = (principal * x * calcInt) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPay.value = monthly.toFixed(2);
    totalPay.value = (monthly * calcPay).toFixed(2);
    totalInt.value = (monthly * calcPay - principal).toFixed(2);

    document.querySelector("#loading").style.display = "none";
    document.querySelector("#results").style.display = "block";
  } else {
    showError();
  }
}

function showError() {
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";

  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".pb-3");

  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode("Please fill the blanks"));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 2000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
