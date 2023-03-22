let url = 'https://kontests.net/api/v1/all'
cardContainer = document.getElementById('cardContainer')
let response = fetch(url)
response.then((v) => {
  return v.json()
}).then((contests) => {
  console.log(contests)
  let ihtml = ""
  let i = 0
  for (item in contests) {
    let start_time = contests[item].start_time
    let end_time = contests[item].end_time
    if (start_time.slice(-3) != 'UTC') {
      start_time = `${start_time.slice(0, 10).split("-").reverse().join("-")} at ${start_time.slice(11, 19)} UTC`
      end_time = `${end_time.slice(0, 10).split("-").reverse().join("-")} at ${end_time.slice(11, 19)} UTC`
    }
    else {
      start_time = `${start_time.slice(0, 10).split("-").reverse().join("-")} at ${start_time.slice(11)}`
      end_time = `${end_time.slice(0, 10).split("-").reverse().join("-")} at ${end_time.slice(11)}`
    }
    let flag = false
    if (contests[item].status === 'CODING')
      flag = true
    ihtml += `
    <div class="card mx-2 my-2" style="width: 20rem;">
    <img src="https://source.unsplash.com/random/500x400/?coding,hacking,computer&${i}" class="card-img-top" alt="Coding Event">
    <div class="card-body">
    <h5 class="card-title">${contests[item].name}</h5>
    <p class="card-text"><b>Status:</b> ${flag ? '<b id="green">ONGOING</b>' : '<b id="blue">STARTING SOON</b>'}</p>
    <p class="card-text"><b>Starts in 24 Hours?</b> ${contests[item].in_24_hours}</p>
    <p class="card-text"><b>Site:</b> ${contests[item].site}</p>
    <p class="card-text"><b>Starts:</b> ${start_time}</p>
    <p class="card-text"><b>Ends:</b> ${end_time}</p>
    <a href="${contests[item].url}" class="btn btn-primary">Visit Contest</a>
    </div>
  </div>`
    i++
  }
  cardContainer.innerHTML = ihtml 
})
