function track_mouse_interval_callback() {
  var mx = krpano.get("mouse.x");
  var my = krpano.get("mouse.y");
  var pnt = krpano.screentosphere(mx, my);
  mouseH = pnt.x;
  mouseV = pnt.y;
}

function track_mouse() {
  if (krpano) {
    if (track_mouse_enabled == false) {
      // enable - call 60 times per second
      track_mouse_interval_id = setInterval(
        track_mouse_interval_callback,
        1000.0 / 60.0
      );

      track_mouse_enabled = true;
    } else {
      // disable
      clearInterval(track_mouse_interval_id);

      track_mouse_enabled = false;
    }
  }
}
