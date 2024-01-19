const addressBarContent = new URLSearchParams(location.search)
console.log(addressBarContent)
const productId = addressBarContent.get('productId')
console.log(productId)
const myURL = 'https://striveschool-api.herokuapp.com/api/product/'

fetch(myURL + '/' + productId)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore')
    }
  })
  .then((singleProduct) => {
    document.getElementById('name').innerText = singleProduct.name
    document.getElementById('description').innerText = singleProduct.description
    document.getElementById('price').innerText = singleProduct.price + '€'
    document.getElementById('brand').innerText = singleProduct.brand

    document.getElementById('delete').addEventListener('click', function () {
      fetch(myURL + '/' + productId, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            alert('cancellato!')
            location.assign('./index.html')
          } else {
            alert('Si è verificato un problema')
            throw new Error('Errore')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

    document
      .getElementById('edit')
      .setAttribute('href', './backoffice.html?productId=' + singleProduct._id)
  })
  .catch((err) => {
    console.log(err)
  })