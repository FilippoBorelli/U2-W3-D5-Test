// creiamo innanzitutto i riferimenti agli elementi della pagina
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const brandInput = document.getElementById('brand')
const form = document.getElementById('product-form')
const myURL = 'https://striveschool-api.herokuapp.com/api/product/'

const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)
const productId = addressBarContent.get('productId')

if (productId) {
  document.getElementById('form-title').innerText = 'Form di modifica prodotto'
  fetch(myURL + '/' + productId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(
          "Hai commeso qualche errore"
        )
      }
    })
    .then((singleProduct) => {
      nameInput.value = singleProduct.name
      descriptionInput.value = singleProduct.description
      priceInput.value = singleProduct.price
      brandInput.value = singleProduct.value
    })
    .catch((err) => {
      console.log(err)
    })
}
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    brand: brandInput.value,
  }

  console.log(newProduct)

  let URLToUse
  let methodToUse

  if (productId) {
    methodToUse = 'PUT'
    URLToUse = myURL + '/' + productId
  } else {
    methodToUse = 'POST'
    URLToUse = myURL
  }

  fetch(URLToUse, {
    headers:{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk5YTE4N2U1YzAwMTgxNGM2MGQiLCJpYXQiOjE3MDU2NTYyMDAsImV4cCI6MTcwNjg2NTgwMH0.PgYCcZnKUbXl_F-kN-4Vr33hbfIAPPjGeOgc4i69qDc",
    'Content-Type': 'application/json'},
    method: methodToUse,
    body: JSON.stringify(newProduct),
    
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        alert('PRODOTTO SALVATO!')
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        brandInput.value = ''
      } else {
        alert('PROBLEMA NEL SALVATAGGIO!')
      }
    })
    .catch((err) => {
      console.log(err)
    })
})