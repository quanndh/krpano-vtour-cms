const hotspotTemplate = `<hotspot name="@name"
url="@url"
keep="false"
renderer="webgl"
visible="true"
enabled="true"
handcursor="true"
cursor="pointer"
maskchildren="true"
zorder=""
style=""
ath="@h" atv="@v"
edge="center"
zoom="false"
distorted="false"
rx="0.0" ry="0.0" rz="0.0"
width="" height=""
scale="0.5"
rotate="0.0"
alpha="1.0"
onclick="@onClick"
/>`;

const generateHotspot = (currentScreen, screenToNavigate) => {
  const screenIndex = screens.findIndex(
    (x) => x.name.toLowerCase() === currentScreen.toLowerCase()
  );

  const newHotspot = mapHotspotMetadata({
    name: `hotspot_${currentScreen}_${
      screens[screenIndex].hotspots.length + 1
    }`,
    h: String(mouseH),
    v: String(mouseV),
    url: "./skin/vtourskin_hotspot.png",
    onClick: `goto(${screenToNavigate.name});`,
  });

  screens[screenIndex].hotspots.push(newHotspot);
};

const mapHotspotMetadata = (data) => {
  const screenProperties = ["name", "h", "v", "url", "onClick"];

  let temp = hotspotTemplate;
  screenProperties.forEach((key) => {
    temp = temp.replace(`@${key}`, data[key]);
  });

  return temp;
};
