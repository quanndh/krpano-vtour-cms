$("body").ready(() => {
  const viewContainer = $("#view-container");

  const viewText = views.map(
    (view, index) => `
    <div class="flex scene-${index} cursor-pointer p-2 border-white border-2">
      <img src="${view.thumbUrl}" class="w-24 h-24 mr-3"/>
      <p class="text-black">${view.name}</p>
    </div>
  `
  );

  viewContainer.append(viewText);

  views.forEach((_, index) => {
    const view = $(`.scene-${index}`);
    view.on("click", () => {
      const viewIndex = selectedView.findIndex((x) => x === index);
      if (viewIndex === -1) {
        view.addClass("border-sky-500").removeClass("border-white");
        selectedView.push(index);
      } else {
        view.addClass("border-white").removeClass("border-sky-500");
        selectedView.splice(viewIndex, 1);
      }
    });
  });
});

$("#modal-submit").on("click", () => {
  handleAddScene();
});

$("#addBtn").on("click", () => {
  $("#modal").removeClass("none").addClass("absolute");
});

$("#addHotspotBtn").on("click", () => {
  if (!track_mouse_enabled) {
    add_hotspot();
  }
});

$("#pano").on("click", () => {
  if (track_mouse_enabled) {
    track_mouse();

    const viewContainer = $("#hotspot-view-container");

    const currentScreen = krpano.get("xml.scene");

    const activeScreens = screens.filter(
      (x) => x.name.toLowerCase() !== currentScreen.toLowerCase()
    );

    const viewText = activeScreens.map(
      (view, index) => `
    <div class="flex hotspot-${index} cursor-pointer p-2 border-white border-2">
      <img src="${view.thumbUrl}" class="w-24 h-24 mr-3"/>
      <p class="text-black">${view.name}</p>
    </div>
  `
    );

    viewContainer.append(viewText);

    activeScreens.forEach((_, index) => {
      const view = $(`.hotspot-${index}`);
      view.on("click", () => {
        if (screenToNavigateIndex !== -1) {
          $(`.hotspot-${screenToNavigateIndex}`)
            .addClass("border-white")
            .removeClass("border-sky-500");
        }
        view.addClass("border-sky-500").removeClass("border-white");
        screenToNavigateIndex = index;
        screenToNavigate = activeScreens[index];
      });
    });

    $("#hotspot-modal").removeClass("none").addClass("absolute");
  }
});

$("#hotspot-modal-submit").on("click", () => {
  handleAppHotspot();
  const viewContainer = $("#hotspot-view-container");
  viewContainer.html("");
  $("#hotspot-modal").removeClass("absolute").addClass("none");
});
