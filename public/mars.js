AFRAME.registerComponent("gameobject", {
    schema: {
      id: { type: "string", default: "" },
    },
    init: function () {
      this.el.addEventListener("click", () => {
          socket.emit("removeMars", this.data.id);
          let gameMode = document.getElementById("gameMode").getAttribute("text").value;
          if(gameMode == "Team Mode")
          {
            socket.emit("updateScore")
          }
          else 
          {
            let score = parseInt(document.getElementById("scoreboard").getAttribute("text").value);
            document.getElementById("scoreboard").setAttribute("text", "value:" + (score + 1) +";"); 
          }
          socket.emit("trackTotal")
          console.log("remove")
      });
    }
  });