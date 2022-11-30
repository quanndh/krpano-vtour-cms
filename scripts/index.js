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

const handleAddScene = () => {
  if (!track_mouse_enabled) {
    const currentScreen = krpano.get("xml.scene");

    selectedView.map((viewIndex) => {
      generateScreen(views[viewIndex]);
    });

    loadxmlstring();
    if (currentScreen) {
      krpano.call(`loadscene(${currentScreen}, null, KEEPVIEW);`);
    }
    $("#modal").removeClass("absolute").addClass("none");
  }
};

function add_hotspot() {
  if (krpano) {
    alert("Click on the position you want to put the hotspot");
    track_mouse();
  }
}

const handleAppHotspot = () => {
  const currentScreen = krpano.get("xml.scene");
  generateHotspot(currentScreen, screenToNavigate);
  loadxmlstring();
  krpano.call(`loadscene(${currentScreen}, null, KEEPVIEW);`);
};
