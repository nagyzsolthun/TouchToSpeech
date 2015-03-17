/**draws the icon of WebReader - the look depends on the volume of playing and the status (on/off) */
define(['icon/mainLayerDrawer', 'icon/loadingLayerDrawer'], function(mainLayerDrawer, loadingLayerDrawer) {
	var canvas;
	var animating = false;

	/** calls the layers render() function with the current time until they all finish */
	function render() {
		animating = true;
		canvas.width = canvas.width;
		var finished = true;
		finished &= mainLayerDrawer.render(Date.now());
		finished &= loadingLayerDrawer.render(Date.now());
		onRenderFinished();
		if(! finished) window.setTimeout(function() {render()}, 10)
		else animating = false;
	}

	/* starts iteration of rendering - if not already started */
	function animate() {
		if(! animating) render();
	}
	
	//================================================= public =================================================
	/** the object to be returned */
	var drawer = {
		set canvas(cnv) {
			canvas = cnv;
			mainLayerDrawer.canvas = canvas;
			loadingLayerDrawer.canvas = canvas;
		}
		,set onRenderFinished(callback) {onRenderFinished = callback;}
	}
	
	drawer.drawTurnedOn = function() {
		mainLayerDrawer.setOn();
		loadingLayerDrawer.setOff();
		animate();
	}
	
	drawer.drawTurnedOff = function() {
		mainLayerDrawer.setOff();
		loadingLayerDrawer.setOff();
		animate();
	}
	
	drawer.drawPlaying = function() {
		mainLayerDrawer.setPlaying();
		loadingLayerDrawer.setOff();
		animate();
	}
	
	drawer.drawLoading = function() {
		mainLayerDrawer.setLoading();
		loadingLayerDrawer.setOn();
		animate();
	}
	
	drawer.drawError = function() {
		loadingLayerDrawer.setOff();
		mainLayerDrawer.setError();
		mainLayerDrawer.animateError();
		animate();
	}

	return drawer;
});