//    <!--get the date for the weather box-->
async function showDateTime() {
    var now = new Date();
    var dateTime = now.toLocaleString();
    document.getElementById("datetime").innerHTML = dateTime;
  }
  setInterval(showDateTime, 1000); // update every second