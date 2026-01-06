

const fromDropDown = document.getElementById('from-currency-select');
const toDropDown = document.getElementById('to-currency-select');


// create Dropdown
currencies.forEach(currency => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDropDown.add(option);
});

currencies.forEach(currency => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

// set default values for Dropdown
fromDropDown.value = "USD";
toDropDown.value = "INR";


let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const result = document.querySelector('.result');

  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;
  
  if (amount.length != 0) {
    fetch(`/.netlify/functions/currency?base=${fromCurrency}&target=${toCurrency}&amount=${amount}`)
      .then((resp) => resp.json())
      .then((data) => {
        
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];

        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

      });
  } else {
    alert("Please fill the Amount");
  }
}


document.querySelector('.convert-button').addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);




