const sceneTemplate = `<scene name="@screenName" title="@screenTitle" onstart="" thumburl="@thumbUrl" lat="" lng="" heading="">
  
<control bouncinglimits="calc:image.cube ? true : false" />

<view hlookat="0.0" vlookat="0.0" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />

<preview url="@preview" />

<image>
  <cube url="@url"  />
</image>

[[__hotspots__]]
</scene>`;

const generateScreen = (view) => {
  const screenPayload = {
    screenName: view.name,
    screenTitle: view.name,
    thumbUrl: view.thumbUrl,
    preview: view.thumbUrl,
    url: view.url,
  };
  const newScreen = mapScreenMetadata(screenPayload);

  screens.push({
    name: screenPayload["screenName"],
    data: newScreen,
    hotspots: [],
    thumbUrl: screenPayload.thumbUrl,
  });
};

const mapScreenMetadata = (data) => {
  const screenProperties = [
    "screenName",
    "screenTitle",
    "thumbUrl",
    "preview",
    "url",
  ];

  let temp = sceneTemplate;
  screenProperties.forEach((key) => {
    temp = temp.replace(`@${key}`, data[key]);
  });

  return temp;
};
