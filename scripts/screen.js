const sceneTemplate = `<scene name="@screenName" title="@screenTitle" onstart="" thumburl="@thumbUrl" lat="" lng="" heading="">
  
<control bouncinglimits="calc:image.cube ? true : false" />

<view hlookat="0.0" vlookat="0.0" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />

<preview url="@preview" />

<image>
  <cube url="@url"  />
</image>

[[__hotspots__]]
</scene>`;

const generateScreen = (screen) => {
  const data = [
    {
      thumbUrl:
        "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
      url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/1.tiles/%s.jpg",
    },
    {
      thumbUrl:
        "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
      url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625502/2.tiles/%s.jpg",
    },
  ];

  const screenPayload = {
    screenName: "test" + screen,
    screenTitle: "test" + screen,
    thumbUrl: data[screen].thumbUrl,
    preview: data[screen].thumbUrl,
    url: data[screen].url,
  };
  const newScreen = mapScreenMetadata(screenPayload);

  screens.push({
    name: screenPayload["screenName"],
    data: newScreen,
    hotspots: [],
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
