(() => {

    let theInstruments = document.querySelectorAll(".instruments");
        dropZones = document.querySelectorAll(".drop-zone")

    // functions here

    function startDrag(event) {
		event.dataTransfer.setData("draggedElement", event.target.class);
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
		this.appendChild(document.querySelector(`.instruments img${currentEl}`));
    }


    theInstruments.forEach(piece => piece.addEventListener("deagstart", startDrag));

    dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", handleDrop);
    });

})();