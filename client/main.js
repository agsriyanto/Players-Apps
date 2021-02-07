const baseUrl = "http://localhost:3000"

function auth() {
  if (!localStorage.getItem("access_token")) {
    $("#alert").hide()
    $("#logout").hide()
    $("#login-page").show()
    $("#main-page").hide()
  } else {
    $("#alert").hide()
    $("#logout").show()
    $("#login-page").hide()
    $("#main-page").show()
    showStudent()
    showPlayer()
  }
}

function notification(message) {
  $("#alert").text(message)
  $("#alert").show()
  setTimeout(() => {
    $("#alert").text('')
    $("#alert").hide()
  }, 2000)
}

function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()
  $.ajax({
    url: `${baseUrl}/login`,
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done((response) => {
    localStorage.setItem("access_token", response.access_token)
    auth()
  })
  .fail(({responseJSON}, text) => {
    console.log(responseJSON)
    const { message } = responseJSON
    notification(message)
  })
  .always(() => {
    $("#login").trigger("reset")
  })
}

function logout() {
  localStorage.clear()
  $(".player").remove()
  auth()
}

function showStudent() {
  $.ajax({
    url: `${baseUrl}/students`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done((student) => {
    student.forEach(value => {
      $("#students-container").append(`
      <div id="student-${value.id}" class="card shadow mt-lg-4 mt-3 col-lg-5 col-12" >
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 id="student-name-${value.id}" class="card-title">${value.name}</h5>
            <h6 class="card-subtitle mb-2 text-warning">${value.house}</h6>
          </div>
          <a href="#" onclick="addToTeam(${value.id})" class="card-link text-right">Add to Team</a>
        </div>
      </div>
      `)
    });
  })
  .fail(err => {
    console.log(err);
  })
}

function showPlayer() {
  $.ajax({
    url: `${baseUrl}/players`,
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(players => {
    players.forEach(player => {
      $("#players-container").append(`
      <li id="player-${player.id}" class="player d-flex flex-row list-group-item justify-content-between align-items-center">
        <div>
          <p class="my-0 font-weight-bold">${player.name}</p>
          <small class="text-muted">${player.position}</small>
        </div>
        <a href="#" onclick="deletePlayer(${player.id})"><i class="material-icons text-danger">delete</i></a>
      </li>
      `)
    })
  })
  .fail(err => {
    console.log(err);
  })
}

function addToTeam(id) {
  // console.log(id);
  const position = $("#position").val()
  const name = $(`#student-name-${id}`).text()
  console.log(name, position);
  $.ajax({
    url: `${baseUrl}/players`,
    method: "POST",
    data: {
      name,
      position
    },
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(player => {
    console.log(player);
    $("#players-container").append(`
    <li id="player-${player.id}" class="d-flex flex-row list-group-item justify-content-between align-items-center">
      <div>
        <p class="my-0 font-weight-bold">${player.name}</p>
        <small class="text-muted">${player.position}</small>
      </div>
      <a href="#" onclick="deletePlayer(${player.id})"><i class="material-icons text-danger">delete</i></a>
    </li>
    `)
  })
  .fail(({responseJSON}) => {
    notification(responseJSON.message)
  })
}

function deletePlayer(id) {
  $.ajax({
    url: `${baseUrl}/players/${id}`,
    method: "DELETE",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(success => {
    $(`#player-${id}`).remove()
  })
  .fail((error) => {
    console.log(error)
    // const { message } = responseJSON
    notification('Access Unauthorized')
  })
}

$(document).ready(() => {
  auth()

  $("#login").on("submit", (e) => {
    e.preventDefault()
    login()
  })

  $("#logout").on("click", (e) => {
    e.preventDefault()
    logout()
  })


})