let apiQuotes = []
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('qoute')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
//show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQuote(){
    //picking a random qoute
    loading()
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    authorText.textContent = quote.author
    if(quote.text.length>120){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }
    //set quote and hide loader
    quoteText.textContent = quote.text
    complete()
}
async function getQoutes(){
    loading()
    const apiUrl = "https://type.fit/api/quotes"
    try{
        const resposnse = await fetch(apiUrl)
        apiQuotes = await resposnse.json()
        newQuote()
    }
    catch(error){
        //catch error 
        console.log(error)
    }
}
//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`
    window.open(twitterUrl,'_blank')
}
//Event Listners
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote)
//on load
getQoutes()