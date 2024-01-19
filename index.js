const generateCards = function (arrayOfProducts) {
    arrayOfProducts.forEach((product) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-4', 'col-lg-3')
      newCol.innerHTML = `
          <div class="card h-100">
              <img src="${product.imageUrl}" class="card-img-top" alt="...">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text flex-grow-1">${product.description}</p>
                  <p class="card-text flex-grow-1">${product.brand}</p>
                  <p class="btn btn-primary mt-2">${product.price}<p>
                  <a href="./details.html?productId=${
                    product._id
                  }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                   SCOPRI DI PIù 
                  </a>
              </div>
          </div>
          `
      const eventsRow = document.getElementById('events-row')
      eventsRow.appendChild(newCol)
    })
  }
  
  const getProducts = function () {
    const myURL = 'https://striveschool-api.herokuapp.com/api/product/'
    fetch(myURL, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzk5YTE4N2U1YzAwMTgxNGM2MGQiLCJpYXQiOjE3MDU2NTYyMDAsImV4cCI6MTcwNjg2NTgwMH0.PgYCcZnKUbXl_F-kN-4Vr33hbfIAPPjGeOgc4i69qDc"
        },
        })
      .then((response) => {
        console.log('response', response)
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore')
        }
      })
      .then((data) => {
        console.log('DATA', data)
        generateCards(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  getProducts()