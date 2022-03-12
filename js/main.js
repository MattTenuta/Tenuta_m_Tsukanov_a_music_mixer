(() => {

    let theInstruments = document.querySelectorAll(".instruments"),
        dropZones = document.querySelectorAll(".drop-zone");
	
	const theAudio = document.querySelector("audio");

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

		// Have to work out the bugs with this line to get audio working properly
		//let theAudio = document.querySelector(`audio[data-trackref="${}"]`);

		theAudio.src =`audio/${theAudio.dataset.trackref}.mp3`;
		theAudio.load();

        playTrack();
    }


    theInstruments.forEach(piece => piece.addEventListener("dragstart", startDrag));

    dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
    });

})();