(function() {
	var balls = [];
	colors = ["#fca85d","#fc865d","#f159f7","#825dfc","#5d5dfc","#5dd1fc","#5dfce0","#5dfca0","#70fc5d","#e4fc5d"];

	var canvas = document.getElementById('canvas_time');
	var context = canvas.getContext("2d");
	var FBwidth = canvas.clientWidth;
	var FBheight = canvas.clientHeight;
	var RADIUS = 2;
	var MT = 0;
	var ML = canvas.clientWidth * 0.1;
	Nowtime = GetTime();

	canvas.width = FBwidth;
	canvas.height = FBheight;

	function GetTime(){
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();
		var timeNow = [hours,minutes,seconds];
		return timeNow;
	}
	
	function render(ctx){
		Nowtime = GetTime();

		ctx.clearRect(0,0,FBwidth,FBheight);

		renderDigit(ML,MT,parseInt(Nowtime[0]/10),ctx);
		renderDigit(ML+15*(RADIUS+1),MT,parseInt(Nowtime[0]%10),ctx);
		renderDigit(ML+30*(RADIUS+1),MT,10,ctx);
		renderDigit(ML+39*(RADIUS+1),MT,parseInt(Nowtime[1]/10),ctx);
		renderDigit(ML+54*(RADIUS+1),MT,parseInt(Nowtime[1]%10),ctx);
		renderDigit(ML+69*(RADIUS+1),MT,10,ctx);
		renderDigit(ML+78*(RADIUS+1),MT,parseInt(Nowtime[2]/10),ctx);
		renderDigit(ML+93*(RADIUS+1),MT,parseInt(Nowtime[2]%10),ctx);

		for( var i = 0 ; i < balls.length ; i ++ ){
	        ctx.fillStyle=balls[i].color;
	        ctx.beginPath();
	        ctx.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
	        ctx.closePath();
	        ctx.fill();
	    }

	}
	function renderDigit(x,y,num,ctx){
		ctx.fillStyle="#fb885b";
		for (var i = 0; i <digit[num].length; i++) {
			for(j=0;j<digit[num][i].length;j++){
				if( digit[num][i][j] == 1 ){
					ctx.beginPath();
					ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
					ctx.closePath();
					ctx.fill();
				}
			}
		}
	}

	function update(){
		var newestTime = GetTime();
		if (Nowtime[2]!=newestTime[2]) {
			if( parseInt(Nowtime[0]/10) != parseInt(newestTime[0]/10) ){
	            addBalls( ML + 0 , MT , parseInt(newestTime[0]/10) );
	        }
	        if( parseInt(Nowtime[0]%10) != parseInt(newestTime[0]%10) ){
	            addBalls( ML + 15*(RADIUS+1) , MT , parseInt(newestTime[0]/10) );
	        }
	        if( parseInt(Nowtime[1]/10) != parseInt(newestTime[1]/10) ){
	            addBalls( ML + 39*(RADIUS+1) , MT , parseInt(newestTime[1]/10) );
	        }
	        if( parseInt(Nowtime[1]%10) != parseInt(newestTime[1]%10) ){
	            addBalls( ML + 54*(RADIUS+1) , MT , parseInt(newestTime[1]%10) );
	        }
	        if( parseInt(Nowtime[2]/10) != parseInt(newestTime[2]/10) ){
	            addBalls( ML + 78*(RADIUS+1) , MT , parseInt(newestTime[2]/10) );
	        }
	        if( parseInt(Nowtime[2]%10) != parseInt(newestTime[2]%10) ){
	            addBalls( ML + 93*(RADIUS+1) , MT , parseInt(newestTime[2]%10) );
	        }
		}
		updateBalls();
	}

	function addBalls( x , y , num ){
	    for( var i = 0  ; i < digit[num].length ; i ++ ){
	        for( var j = 0  ; j < digit[num][i].length ; j ++ ){
	            if( digit[num][i][j] == 1 ){
	                var aBall = {
	                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
	                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
	                    g:1.5+Math.random(),
	                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
	                    vy:-5,
	                    color: colors[ Math.floor( Math.random()*colors.length ) ]
	                }

	                balls.push( aBall )
	            }
            }
        }
	}
	function updateBalls(){

	    for( var i = 0 ; i < balls.length ; i ++ ){

	        balls[i].x += balls[i].vx;
	        balls[i].y += balls[i].vy;
	        balls[i].vy += balls[i].g;

	        if( balls[i].y >= FBheight-RADIUS ){
	            balls[i].y = FBheight-RADIUS;
	            balls[i].vy = - balls[i].vy*0.6;
	        }
	    }
        var cnt = 0
	    for( var i = 0 ; i < balls.length ; i ++ ){
	        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < FBwidth )
	            balls[cnt++] = balls[i]
	    }

	    while( balls.length > cnt ){
	        balls.pop();
	    }
	}
	setInterval(function(){
		update();
		render(context);
	},50)
})();
(function(){
	function initRenderer(){
		// FPS信息
		// stat = new Stats();
	 //    stat.domElement.style.position = 'absolute';
	 //    stat.domElement.style.left = '10px';
	 //    stat.domElement.style.top = '10px';
	 //    document.body.appendChild(stat.domElement);

		renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('EarthCanvas')
		})
		renderer.setClearColor(0xf9cc9d);
	}

	// 场景
	function initScene() {
		scene = new THREE.Scene();
	}

	// 照相机
	// 400px 300px的canvas 所以比例也是4 3
	function initCamera() {
		camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
		camera.position.set(4, -3, 5);
		camera.up.x = 0;
		camera.up.y = 1;
		camera.up.z = 0;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	}
	
	//添加点光源
	function initLight() {
	 //   	var light = new THREE.PointLight(0xffffff, 2, 10);
		// light.position.set(1.5,0, 2);
		// scene.add(light);

		var light = new THREE.AmbientLight(0xffffff);
		scene.add(light);
	}

	function objQiu(){
		//载入图片
		var texture = THREE.ImageUtils.loadTexture('/libs/images/3.jpg', {}, function() {
		    renderer.render(scene, camera);
		});

		// 创建球
		qiu = new THREE.Mesh(new THREE.SphereGeometry(1,50,50),
        	new THREE.MeshPhongMaterial({
	            map: texture
	        })
		);
		qiu.rotation.x = qiu.rotation.x + 0.4;
		qiu.rotation.z = qiu.rotation.z - 0.4;
		scene.add(qiu);
	}
	function render() {
		// stat.begin();
		animate = requestAnimationFrame(render);
		qiu.rotation.y = (qiu.rotation.y + 0.01) % (Math.PI * 2);
		renderer.render(scene, camera);
		// stat.end();
	}
	function threeStart() {
		initRenderer();
		initCamera();
		initScene();
		initLight();
		objQiu();
		render();
	} 
	window.onload = threeStart();
})()