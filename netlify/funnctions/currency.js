exports.handler = async (event) => {
  const { base, target, amount } = event.queryStringParameters;

  const API_KEY = process.env.EXCHANGERATE_API_KEY;
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== "success") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid API response" }),
      };
    }

    const rate = data.conversion_rates[target];
    const convertedAmount = (amount * rate).toFixed(2);

    return {
      statusCode: 200,
      body: JSON.stringify({
        base,
        target,
        rate,
        amount,
        convertedAmount,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Currency conversion failed" }),
    };
  }
};
