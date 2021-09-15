function showScores() {
    var topscores = JSON.parse(window.localStorage.getItem("topscores")) || [];
  
    topscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    topscores.forEach(function(score) {
      // bullets for scores
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("topscores");
      olEl.appendChild(liTag);
    });
  }
  
  function changeScores() {
    window.localStorage.removeItem("topscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = changeScores;
  

  showScores();
  