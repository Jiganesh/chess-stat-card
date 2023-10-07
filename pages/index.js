
const NOAVATAR = "https://www.chess.com/bundles/web/images/noavatar_l.84a92436.gif"
const DEFAULT_LOCATION = "Somewhere on Earth"

async function get_stats(){

  try{
  const inputfieldname = document.getElementById("username")
  const username = inputfieldname.value

  const player_details_url = `https://api.chess.com/pub/player/${username}/`
  const player_details_response = await fetch(player_details_url)

  const player_details = await player_details_response.json(); 


  document.querySelector("#avatar_image").src = player_details.avatar
  document.querySelector("#avatar_name").innerHTML = player_details.name


  const player_stats_url = `https://api.chess.com/pub/player/${username}/stats/`
  const player_stats_response = await fetch(player_stats_url)

  const player_stats = await player_stats_response.json(); 

  const rapid_best_stats =  (player_stats.hasOwnProperty("chess_rapid")) ? player_stats.chess_rapid.best["rating"]  : "Not Available"
  const blitz_best_stats =  (player_stats.hasOwnProperty("chess_blitz")) ? player_stats.chess_blitz.best["rating"] : "Not Available"
  const bullet_best_stats = (player_stats.hasOwnProperty("chess_bullet"))? player_stats.chess_bullet.best["rating"] : "Not Available"
  const daily_best_stats =  (player_stats.hasOwnProperty("chess_daily")) ? player_stats.chess_daily.best ["rating"] : "Not Available"


  let dictionary = {
    photo : (player_details.avatar == undefined) ? NOAVATAR: player_details.avatar,
    name : player_details.name,
    username: player_details.username,
    location: (player_details.location == undefined) ? DEFAULT_LOCATION : player_details.location ,
    league : player_details.league,
    rapid_best : rapid_best_stats,
    blitz_best : blitz_best_stats,
    bullet_best: bullet_best_stats,
    daily_best:daily_best_stats
  }

  document.querySelector("#avatar_image").src = dictionary.photo
  document.querySelector("#avatar_name").innerHTML = "Name :" + dictionary.name
  document.querySelector("#avatar_username").innerHTML = "Username :" +dictionary.username
  document.querySelector("#avatar_league").innerHTML = "League :" + dictionary.league
  document.querySelector("#avatar_rapid").innerHTML = "Best score in Rapid :"  + dictionary.rapid_best
  document.querySelector("#avatar_bullet").innerHTML = "Best score in Bullet :" +dictionary.bullet_best
  document.querySelector("#avatar_blitz").innerHTML = "Best score in Blitz :" + dictionary.blitz_best
  document.querySelector("#avatar_daily").innerHTML = "Best score in Daily :" + dictionary.daily_best
  document.querySelector("#avatar_location").innerHTML = "Location :" + dictionary.location


  console.log(dictionary)}
  catch{
    console.log("SOMETHING WENT WRONG AHHHHHHHHHH")
  }

}

function Chess(){

  return (
      <div className="center">
          <label className="padding">Provide username here : </label>
          <input  className= "padding" type="text" name="name" id="username" onChange={get_stats}/> <br></br>

          <img src={NOAVATAR} id="avatar_image"></img>  <br></br>
          <p1 id="avatar_name">Name :</p1> <br></br>
          <p1 id="avatar_username">Username :</p1> <br></br>
          <p1 id="avatar_location">Location :</p1> <br></br>
          <p1 id="avatar_league">League :</p1> <br></br>
          <p1 id="avatar_rapid">Best score in Rapid :</p1> <br></br>
          <p1 id="avatar_blitz">Best score in Blitz :</p1> <br></br>
          <p1 id="avatar_bullet">Best score in Bullet :</p1> <br></br>
          <p1 id="avatar_daily">Best score in Daily :</p1> <br></br>


          

      </div>
  )
}

export default Chess