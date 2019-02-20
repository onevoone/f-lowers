var camera, scene, renderer, effect, controls;
var start = Date.now();
var object = {};

var width = window.innerWidth;
var height = window.innerHeight;

var loader;

init();

animate();

function init() {

	var container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000);
	camera.position.y = 0;
	camera.position.z = 2200;

	controls = new THREE.TrackballControls(camera);

	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	var light = new THREE.PointLight(0xffffff);
	light.position.set(500, 500, 500);

	var light = new THREE.PointLight(0xffffff, 0.4);
	light.position.set(500, 500, 500);
	scene.add(light);

	// model
	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
		}
	}

	function onError(e) { 
		console.error(e)
	}
	
	var loader = new THREE.OBJLoader();
	loader.load('../assets/tulip_flower.obj', function (tulip) {
		removeLoader();

		object = tulip;

		object.scale.set(70, 70, 70);
		object.position.set(-100, -600, 0);

		object.rotation.x = -1;
		scene.add(object);

	}, onProgress, onError);

	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	
	effect = new THREE.AsciiEffect(renderer);
	effect.setSize(width, height);
	container.appendChild(effect.domElement);

	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
	effect.setSize(width, height);
}

function animate() {

	requestAnimationFrame(animate);
	render();
}

function render() {
	var timer = Date.now() - start;

	if (object && object.rotation) {
		object.rotation.z = timer * 0.0008;

		controls.update();
	
		effect.render(scene, camera);
	}
	return;
}

function removeLoader() {
	loader = document.getElementById('loader');
	document.body.removeChild(loader);
}