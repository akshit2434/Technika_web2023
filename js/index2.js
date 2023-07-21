

var isPC = true;
if ($(".pc").css("display") == "none") isPC = false;

if (!isPC){
    $("#after-wave").css("margin-top", 0);
    $("#skillcanvas").remove()
}else{
    $('#knowmorebtn').tilt({
        scale: 1.07,
    })
    
    $('.sponsor').tilt({
        scale: 1.07,
        // glare: true,
        maxGlare: .5, 
    })
    
    $('#ourteam_content').tilt({
        // scale: 1.07,
        // glare: true,
        // maxGlare: .5, 
    })
}

// import * as THREE from "three";
$(document).ready(function () {
    setTimeout(function () {
        $(".fade-enter").animate({
            opacity: 1,
            top: "100px"
        });
    }, 2000)
    akshit = document.getElementById("akshit")
    console.log("hey");

    var akshit_typewriter = new Typewriter("#info", {
        // cursor:"",
        delay: 50
    });

    // akshit_typewriter.typeString("<span class='texthover1'>Akshit</span>")
    // .deleteChars(10)
    akshit_typewriter
        .changeDeleteSpeed(15)
        .pauseFor(1500)
        .typeString("<span id='technika'>Technika</span>")
        .pauseFor(1000)
        .deleteChars(8)
        .typeString("<span id='technika' class='long'>Decode, Derivate, Discover!</span>")
        .pauseFor(1000)
        .deleteChars("Decode, Derivate, Discover!".length)
        .typeString("<span id='technika'><span class='bounce'>T</span><span class='bounce'>E</span><span class='bounce'>C</span><span class='bounce'>H</span><span class='bounce'>N</span><span class='bounce'>I</span><span class='bounce'>K</span><span class='bounce'>A</span><span class='bounce'>!</span></span>")
        .start()

    if (isPC){
        init();
        animate();
    }
    setTimeout(function(){
        $("#loader").fadeOut();
        setTimeout(function(){$("#loader").fadeOut();}, 1000)
    },1000);

    $(".event-card.card-1 .info").hover(function(){$(this).css("overflow","scroll");$(this).css("overflow-x","hidden");$(this).css("padding-right","0px")},function(){$(this).css("overflow","hidden");$(this).scrollTop(0);$(this).css("padding-right","10px")})

});


let camera, scene, renderer, stats, material, polysphere, particles;
let mouseX = 0, mouseY = 0;
particlesCount = 2000;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

var spwave = document.getElementById("second-page");
var introdiv = document.getElementById("intro-div");
var introdiv_previous_marginTop = $("#intro-div").css("margin-top");
var spwave_previous_marginTop = $("#after-wave").css("margin-top");
(spwave_previous_marginTop==null) ? spwave_previous_marginTop=0 : spwave_previous_marginTop = parseInt(spwave_previous_marginTop.substring(0,spwave_previous_marginTop.length-2));
(introdiv_previous_marginTop==null) ? intro_previous_marginTop=0 : introdiv_previous_marginTop = parseInt(introdiv_previous_marginTop.substring(0,introdiv_previous_marginTop.length-2));

var maxvalY = 0;
//Paralax ish stuff
window.addEventListener("scroll", function(){
    var valX = window.scrollX;
    var valY = window.scrollY;
    var scrolledPercentage = valY/$(window).height();
    // -127.65
    // console.log(valY/$(window).height())
    // 
    // $(".hamburger-menu").css("margin-top",30+valY);
    if (valY > maxvalY) maxvalY=valY;
    if (isPC){
        // spwave.style.marginTop = (spwave_previous_marginTop + (-valY*0.25))+'px';
        introdiv.style.marginTop = (introdiv_previous_marginTop + (-valY*0.25))+'px';
    }else{
        $("#second-page").css("margin-top", 0);
    }
})

let secondpage_tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".ocean",
        start:"top center",
        once:false,
    },
})

$("#events_heading").remove()
if (!hasTouch || isPC){
    secondpage_tl.from("#info_grid", {x:200, opacity:0, duration:2,ease: "power4.out"})
}
// secondpage_tl.from("#events_heading", {y:50, opacity:0, duration:2, ease: "expo.out"}, "-=1");
// secondpage_tl.from(".hamburger-menu", {
//     scrollTrigger:{
//         scrub:true,
//         trigger: ".ocean",
//         start:"top center",
//         once:false,
//     },x:-50, opacity:0,ease:"power3.out", duration:0.1})

secondpage_tl.to("#navbar", { duration:2,ease: "power4.out"},"-=1.5")

if (isPC){
    
        
    secondpage_tl.to(".logo", {scrollTrigger:{
        scrub:true,
        trigger: ".ocean",
        start:"top center",
        once:false,
    }, duration:.5, height:"90px", width:"90px",marginTop:"10px", ease: "power3.out"})
}
secondpage_tl.to(".items", {scrollTrigger:{
    scrub:true,
    trigger: ".ocean",
    start:"top center",
    once:false,
}, duration:.5, color:"black", marginTop:"55px", ease: "power3.out"})
secondpage_tl.to("#navbar", {scrollTrigger:{
    scrub:true,
    trigger: ".ocean",
    start:"top center",
    once:false,
}, duration:.5, backgroundColor:"rgba(0,0,0,0.2)",ease: "power3.out"})


$(".close").on("click",closeModal)
function closeModal(){
    $(".modal").fadeOut();
    $(".modal_cover").fadeOut();
}
function openModal(heading, text){
    var wasOpen=false;
    if($(".modal").css("display") == "block"){
        wasOpen=true;
    }
    $(".modal").fadeOut();
    if(!wasOpen) $(".modal_cover").fadeOut();
    $(".modal .heading").text(heading);
    $(".modal .text").text(text);
    $(".modal").fadeIn();
    $(".modal_cover").fadeIn();
}


function init() {
    const star = new THREE.TextureLoader().load('../assets/img/star.png');

    //setup camera
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
    camera.position.z = 1000;

    //setup scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x344966 );
    // scene.background = new THREE.Color( 0x2d6a4f);
    scene.fog = new THREE.FogExp2(0x344966, 0.001);

    //Geometries
    const star_geometry = new THREE.BufferGeometry();
    const polysphere_geometry = new THREE.SphereGeometry(5, 7, 7);

    //MATERIALS
    star_material = new THREE.PointsMaterial({
        size: 15,
        sizeAttenuation: true,
        map: star,
        alphaTest: 0.5,
        transparent: true,
        color: 0xfafafa
    });

    polysphere_material = new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        wireframe: true,
        roughness: 0.5,
        metalness: 0.9,
        // clearcoat:1.0,
        // clearcoatroughness: 0.1
    });

    const vertices = [];


    for (let i = 0; i < particlesCount; i++) {

        const x = 2000 * Math.random() - 1000;
        const y = 2000 * Math.random() - 1000;
        const z = 2000 * Math.random() - 1000;

        vertices.push(x, y, z);

    }

    // pointLight = new THREE.DirectionalLight(0xffffff, 5);
    // pointLight.position.set(1, 3, 1200);
    // scene.add(pointLight);

    star_geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    particles = new THREE.Points(star_geometry, star_material);

    polysphere = new THREE.Mesh(polysphere_geometry, polysphere_material)
    scene.add(particles);//, polysphere);

    polysphere.position.z = 980;
    polysphere.position.x = 10;
    //

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#skillcanvas"),
        alpha: true
    });

    
    renderer.setPixelRatio(Math.round( $(window).width() / ($(window).height()+100) ));
    renderer.setSize($(window).width(), $(window).height()+100);


    // document.body.style.touchAction = 'none';
    document.body.addEventListener('pointermove', onPointerMove);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

    if (event.isPrimary === false) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

//

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    const time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += ((- mouseY - camera.position.y) * 0.01);
    polysphere.position.x += ((mouseX + 8) - polysphere.position.x) * 0.01;
    polysphere.position.y += (- mouseY - polysphere.position.y) * 0.01;
    polysphere.rotation.x += ((mouseX - polysphere.position.x) * 0.0001);
    polysphere.rotation.y += (- mouseY - polysphere.position.y) * 0.0001;
    // console.log(mouseX, mouseY)
    // camera.lookAt( scene.position );

    // const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    // material.color.setHSL( h, 0.5, 0.5 );

    renderer.render(scene, camera);

}

function brochure(id){
    if(!hasTouch()){
        open(window.location.href.split("/").splice(0,window.location.href.split("/").length-1).join("/")+"/assets/brochure.pdf#page="+id);
    }
}

function loadurl(x){
    open(x);
    // console.log(this);
}
function openpage(id, x){
    x=x || "_blank";
    open(window.location.href.split("/").splice(0,window.location.href.split("/").length-1).join("/")+"/"+id, x);
}


//prevent  hover effects for mobile
function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
  }

function countdown()  {
    const countDate = new Date("August 22, 2023, 09:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    var textDay = Math.max(0,Math.floor(gap/day));
    var textHour = Math.max(0,Math.floor((gap%day)/hour));
    var textMinute = Math.max(0,Math.floor((gap%hour)/minute));
    var textSecond = Math.max(0,Math.floor((gap%minute)/second));

    if(textDay < 10) textDay = "0"+ textDay;
    if(textHour < 10) textHour = "0"+textHour;
    if(textMinute < 10) textMinute = "0"+textMinute;
    if(textSecond < 10) textSecond= "0"+textSecond;

    $(".dvalue").html(textDay);
    $(".hvalue").html(textHour);
    $(".mvalue").html(textMinute);
    $(".svalue").html(textSecond);
}

setInterval(countdown, 1000);
//   if (hasTouch()) { // remove all the :hover stylesheets
//     try { // prevent exception on browsers not supporting DOM styleSheets properly
//       for (var si in document.styleSheets) {
//         var styleSheet = document.styleSheets[si];
//         if (!styleSheet.rules) continue;
  
//         for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
//           if (!styleSheet.rules[ri].selectorText) continue;
  
//           if (styleSheet.rules[ri].selectorText.match(':hover')) {
//             styleSheet.deleteRule(ri);
//           }
//         }
//       }
//     } catch (ex) {}
//   }