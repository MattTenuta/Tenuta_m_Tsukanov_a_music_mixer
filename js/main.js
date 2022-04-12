(() => {

    let theInstruments = document.querySelectorAll(".instruments"),
        dropZones = document.querySelectorAll(".drop-zone"),
		dragBoard = document.querySelector(".instruments");
	
	const theAudio = document.querySelector("audio"),
	playButton = document.getElementById("playButton"),
	pauseButton = document.getElementById("pauseButton"),
	rewindButton = document.getElementById("rewindButton");

    // functions here

	function playTrack() {
		theAudio.play();
	
	}

    function startDrag(event) {
		event.dataTransfer.setData("draggedElement", event.target.id);
	}

    function draggedOver(event) {
		event.preventDefault();
		console.log("dragged over drop zone");
	}

    function handleDrop(event) {
		event.preventDefault();
		console.log("dropped on me");
		let currentEl = event.dataTransfer.getData("draggedElement");
		console.log("dropped this element:", currentEl);
		this.appendChild(document.querySelector(`#${currentEl}`));

		// returns pieces if there is a child
		dropZones.forEach(zone => {
			if (zone.childElementCount > 0) {
				dragBoard.appendChild(zone.firstElementChild);
			}
		})

		// Have to work out the bugs with this line to get audio working properly
		//let theAudio = document.querySelector(`audio[data-trackref="${}"]`);

		theAudio.src =`audio/${theAudio.dataset.trackref}.mp3`;
		theAudio.load();

        playTrack();
    }

	function playTrack() {theAudio.play(); }
	function pauseTrack() {theAudio.pause(); }

    function rewindTrack() {
        theAudio.currentTime = 0;
        
        playTrack();
    }


    theInstruments.forEach(piece => piece.addEventListener("dragstart", startDrag));

    dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
    });

	playButton.addEventListener("click", playTrack);
	pauseButton.addEventListener("click", pauseTrack);
    rewindButton.addEventListener("click", rewindTrack);

})();