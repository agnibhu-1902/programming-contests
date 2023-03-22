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
      start_time = `${start_time.slice(0, 10)} ${start_time.slice(11, 19)} UTC`
      end_time = `${end_time.slice(0, 10)} ${end_time.slice(11, 19)} UTC`
    }
    ihtml += `
    <div class="card mx-2 my-2" style="width: 20rem;">
  <img src="https://source.unsplash.com/random/500x400/?coding,hacking,computer&${i}" class="card-img-top" alt="Coding Event">
  <div class="card-body">
    <h5 class="card-title">${contests[item].name}</h5>
    <p class="card-text">Status: ${contests[item].status === 'CODING' ? '<b>RUNNING</b>' : '<b>NOT RUNNING</b>'}</p>
    <p class="card-text">Starts in 24 Hours? ${contests[item].in_24_hours}</p>
    <p class="card-text">Site: ${contests[item].site}</p>
    <p class="card-text">Starts at: ${start_time}</p>
    <p class="card-text">Ends at: ${end_time}</p>
    <a href="${contests[item].url}" class="btn btn-primary">Visit Contest</a>
    </div>
  </div>`
    i++
  }
  cardContainer.innerHTML = ihtml 
})