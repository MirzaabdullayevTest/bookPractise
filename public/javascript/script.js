const price = document.querySelectorAll('.price'); // massiv

price.forEach(p => {  // map bilan tekshiramiz
    p.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'usd',
        style: 'currency'
    }).format(p.textContent)
})