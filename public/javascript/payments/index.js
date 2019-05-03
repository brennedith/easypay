/* CRUD */

//Read
function readOrder() {
  $productsList = document.getElementById('products-list');
  $amount = document.getElementById('amount');

  axios.get(`${HOSTNAME}/api/payment/${PAYMENT_ID}`).then(({ data: payment }) => {
    const { products, amount, complete } = payment;

    // Redirects the user if the payment was process already
    if (complete) return (location.href = '/thanks');

    // Updates DOM
    $productsList.innerHTML = products.map(renderProductRow).join('');
    $amount.innerHTML = amount.toFixed(2);

    //Generates PayPal Button
    generatePayPalButton(amount);
  });
}

/* Helpers */

// Renders
function renderProductRow(product) {
  return `
  <tr>
    <td>${product.name}</td>
    <td>${product.price.toFixed(2)}</td>
  </tr>`;
}

function generatePayPalButton(amount) {
  paypal
    .Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount
              }
            }
          ]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          axios
            .patch(`${HOSTNAME}/api/payment/${PAYMENT_ID}`, {
              orderId: data.orderID
            })
            .then(payment => {
              location.href = '/thanks';
            });
        });
      }
    })
    .render('#paypal-button-container');
}

/* INIT */

document.addEventListener('DOMContentLoaded', readOrder);
