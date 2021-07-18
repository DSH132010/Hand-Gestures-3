//Geting The DOM Element And Declaring Const's For The Each DOM Element That Need's For The Output And Declaring ModelUrl In A Const

const camera = document.querySelector(".camera");
const result = document.querySelector(".result");
const navOverlay = document.querySelector(".overlay");
const NavBtn = document.querySelector(".NavBtn");
const NavBtnClose = document.querySelector(".NavBtnClose");
const update_emoji = document.getElementById("update_emoji");
const update_emoji2 = document.getElementById("update_emoji2");
const emotion_name2 = document.getElementById("result_emotion_name2");
const emotion_name = document.getElementById("result_emotion_name");
const model = "https://teachablemachine.withgoogle.com/models/sjCHm_C6H/model.json";

window.addEventListener("load", (e) => {
  navOverlay.classList.remove("open-Overlay");
});

Webcam.set({
  width: 400,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

Webcam.attach(camera);

function take_snapshot() {
  Webcam.snap(data_uri => {
    result.innerHTML =
      '<img id="captured_image" class="capturedImage" src="' + data_uri + '"/>';
    console.log("Succesfully Captured Image !!");
  });
}

console.log("ml5 version: ", ml5.version);
classifier = ml5.imageClassifier(model, modelLoaded);

function modelLoaded() {
  console.log("Model Loaded !!");
}

NavBtn.addEventListener("click", (e) => {
  navOverlay.classList.add("open-Overlay");
});

NavBtnClose.addEventListener("click", (e) => {
  navOverlay.classList.remove("open-Overlay");
});

function speak() {
  var synth = window.speechSynthesis;
  speak_data_1 = "The First Prediction Is " + prediction_1;
  speak_data_2 = "The Second Prediction Is " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

function check() {
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
  console.log(classifier);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    emotion_name.innerHTML = results[0].label;
    emotion_name2.innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    console.log(results[0], results[1]);
    speak();

    if (results[0].label == "Thumbs-Up") {
      update_emoji.innerHTML = "&#128077;";
    }

    if (results[0].label == "Thumbs-Down") {
      update_emoji.innerHTML = "&#128078;";
    }

    if (results[0].label == "Super") {
      update_emoji.innerHTML = "&#128076;";
    }

    if (results[1].label == "Thumbs-Up") {
      update_emoji2.innerHTML = "&#128077;";
    }

    if (results[1].label == "Thumbs-Down") {
      update_emoji2.innerHTML = "&#128078;";
    }

    if (results[1].label == "Super") {
      update_emoji2.innerHTML = "&#128076;";
    }
  }
}
