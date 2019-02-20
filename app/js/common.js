$(function() {



	var container, stats;

	var camera, controls, scene, renderer;
	var effect;

	var sphere, plane;

	var start = Date.now();

	init();

	function init() {

		// var width = window.innerWidth || 2;
		var width = 300;
		// var height = window.innerHeight || 2;
		var height = 700;

		container = document.getElementById("element");
		document.body.appendChild(container);


		camera = new THREE.PerspectiveCamera(25, width / height, 1, 10000);
		camera.position.y = 0;
		// camera.position.z = 2000;
		camera.position.z = 220;

		// controls = new THREE.TrackballControls(camera);

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0xffffff);

		// var light = new THREE.PointLight(0xffffff);
		// light.position.set(500, 500, 500);
		//scene.add( light );

		// var light = new THREE.PointLight(0xffffff, 0.4);
		// // light.position.set(500, 500, 500);
		// scene.add(light);

		// model
		var material = new THREE.MeshLambertMaterial();
		var loader = new THREE.OBJLoader();
		// loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/253981/testrosentitled.obj', function (gltf) {
		loader.load("../assets/tulip_flower.obj", function (gltf) {

			/*gltf.scene.traverse( function ( child ) {

				if ( child.isMesh ) {
					//child.material = material;

				}

			} );*/
			tulip = gltf;
			tulip.scale.set(5, 5, 5);
			// tulip.scale.set(10, 10, 10);

			tulip.rotation.x = -1;
			// tulip.position.set(0, -500, 0);
			tulip.position.set(0, -40, 0);

			scene.add(tulip);

			animate();
		}, undefined, function (e) {

			console.error(e);

		});


		renderer = new THREE.CanvasRenderer();
		renderer.setSize(width, height);
		// container.appendChild( renderer.domElement );

		effect = new THREE.AsciiEffect(renderer, undefined, { resolution: 0.3 });
		// effect = new THREE.AsciiEffect(renderer, undefined, { alpha: true });
		// effect = new THREE.AsciiEffect(renderer);
		// effect.setSize(width, height);
		effect.setSize(width, height);
		container.appendChild(renderer.domElement);

	}

	function animate() {

		requestAnimationFrame(animate);
		render();
	}

	function render() {

		var timer = Date.now() - start;

		//sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
		// tulip.rotation.y = timer * 0.0008;
		//tulip.rotation.x = Math.sin( timer * 0.0002 )  * 1;
		// tulip.rotation.z = Math.cos( timer * 0.00002 )  * -10;
		tulip.rotation.z = timer * 0.00018;
		// sphere.rotation.x = timer * 0.0003;
		//sphere.rotation.z = timer * 0.0002;

		// controls.update();

		effect.render(scene, camera);

	}

});
