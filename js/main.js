(() => {

    let theInstruments = document.querySelectorAll(".instruments"),
        dropZones = document.querySelectorAll(".drop-zone"),
		dragBoard = document.querySelector(".instruments");
	
	const playButton = document.getElementById("playButton"),
	pauseButton = document.getElementById("pauseButton"),
	rewindButton = document.getElementById("rewindButton");

    // functions here

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

		if (this.children.length > 0) {return}

		// get a ref to the dropoed element
		let droppedEl = document.querySelector(`#${currentEl}`);
		this.appendChild(droppedEl);

		// Have to work out the bugs with this line to get audio working properly
		//let theAudio = document.querySelector(`audio[data-trackref="${}"]`);

		let newAudio = document.createElement("audio");

		newAudio.src =`audio/${droppedEl.dataset.trackref}.mp3`;
		newAudio.load();

		document.body.appendChild(newAudio),
		newAudio.play();
    }

	function playTrack() {
		// get the auido the user had added
		let audioClips = document.querySelectorAll("audio");
		
		// loop through and play
		audioClips.forEach(clip => clip.play()); 
	}

	function pauseTrack() {
		let audioClips = document.querySelectorAll("audio");

		audioClips.forEach(clip => clip.pause());
	}

    function rewindTrack() {
		let audioClips = document.querySelectorAll("audio");

		audioClips.forEach(clip => clip.currentTime = 0);


       // newAudio.currentTime = 0;
        
        playTrack();
    }

	function reset() {

		// dropZones.forEach(zone => {
	//	if (zone.childElementCount > 0) {
	//		dragBoard.appendChild(zone.firstElementChild);
	//	}
	// })

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