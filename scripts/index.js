let krpano = null;

embedpano({
  xml: null,
  target: "pano",
  html5: "only",
  mobilescale: 1.0,
  passQueryParameters: "startscene,startlookat",
  onready: krpano_onready_callback,
});

function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;
}

function loadxmlstring() {
  let screenText = "";

  screens.forEach((screen) => {
    let currentScreenText = screen.data;
    const currentScreenHotspotText = screen.hotspots.join("\n");
    currentScreenText = currentScreenText.replace(
      "[[__hotspots__]]",
      currentScreenHotspotText
    );
    screenText += currentScreenText;
  });

  let xmlString = baseXml;

  xmlString = xmlString.replace("[[__screens__]]", screenText);

  if (krpano) {
    krpano.call("loadxml(" + xmlString + ", null, KEEPVIEW, BLEND(0));");
  }
}

function add_hotspot() {
  if (krpano) {
    alert("Click on the position you want to put the hotspot");
    track_mouse();
  }
}

document.getElementById("pano").addEventListener("click", () => {
  if (track_mouse_enabled) {
    track_mouse();
    const currentScreen = krpano.get("xml.scene");
    generateHotspot(nHotspot, currentScreen);
    nHotspot++;
    loadxmlstring();
    krpano.call(`loadscene(${currentScreen}, null, KEEPVIEW);`);
  }
});

document.getElementById("addBtn").addEventListener("click", () => {
  if (!track_mouse_enabled) {
    const currentScreen = krpano.get("xml.scene");
    generateScreen(nScreen);
    nScreen++;
    loadxmlstring();
    if (currentScreen) {
      krpano.call(`loadscene(${currentScreen}, null, KEEPVIEW);`);
    }
  }
});

document.getElementById("addHotspotBtn").addEventListener("click", () => {
  if (!track_mouse_enabled) {
    add_hotspot();
  }
});
