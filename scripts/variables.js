let track_mouse_enabled = false;
let track_mouse_interval_id = null;
let mouseH = 0;
let mouseV = 0;

let screens = [];
let screenToNavigateIndex = -1;
let screenToNavigate = null;

const views = [
  {
    name: "Hành lang 1",
    thumbUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/first.tiles/f.jpg",
    previewUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
    url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/first.tiles/%s.jpg",
  },
  {
    name: "Hành lang 2",
    thumbUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/1.tiles/f.jpg",
    previewUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
    url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/1.tiles/%s.jpg",
  },
  {
    name: "Hành lang 3",
    thumbUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/2.tiles/f.jpg",
    previewUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
    url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/2.tiles/%s.jpg",
  },
  {
    name: "Hành lang 4",
    thumbUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/3.tiles/f.jpg",
    previewUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
    url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/3.tiles/%s.jpg",
  },
  {
    name: "Hành lang 5",
    thumbUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/4.tiles/f.jpg",
    previewUrl:
      "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669604264/preview_uvuelc.png",
    url: "https://res.cloudinary.com/dtw4jm3vs/image/upload/v1669625268/4.tiles/%s.jpg",
  },
];

let selectedView = [];

let baseXml = `
<krpano version="1.20.11" title="Virtual Tour">
<include url="skin/vtourskin.xml" />


<style name="dragablehotspot"
       dragging="if(pressed, sub(dx,mouse.stagex,drag_adjustx); sub(dy,mouse.stagey,drag_adjusty); screentosphere(dx,dy,ath,atv); if(onDrag!==null, onDrag() ); delayedcall(0,dragging()); , if(onDragEnd!==null, onDragEnd() ); );"
       ondown="spheretoscreen(ath,atv,hotspotcenterx,hotspotcentery); sub(drag_adjustx,mouse.stagex,hotspotcenterx); sub(drag_adjusty,mouse.stagey,hotspotcentery); if(onDragStart!==null, onDragStart() ); dragging();"
       />
       
<action name="goto">
	skin_loadscene(%1, OPENBLEND(0.8, 0.0, 0.6, 0.3, easeOutQuad));
</action>

<skin_settings maps="false"
               maps_type="google"
               maps_bing_api_key=""
               maps_google_api_key=""
               maps_zoombuttons="false"
               maps_loadonfirstuse="true"
               gyro="true"
               gyro_keeplookingdirection="false"
               webvr="true"
               webvr_keeplookingdirection="true"
               webvr_prev_next_hotspots="true"
               autotour="false"
               littleplanetintro="false"
               followmousecontrol="false"
               title="true"
               thumbs="true"
               thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"
               thumbs_opened="false"
               thumbs_text="false"
               thumbs_dragging="true"
               thumbs_onhoverscrolling="false"
               thumbs_scrollbuttons="false"
               thumbs_scrollindicator="false"
               thumbs_loop="false"
               tooltips_buttons="false"
               tooltips_thumbs="false"
               tooltips_hotspots="false"
               tooltips_mapspots="false"
               deeplinking="false"
               loadscene_flags="MERGE"
               loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"
               loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"
               loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"
               loadingtext=""
               layout_width="100%"
               layout_maxwidth="814"
               controlbar_width="-24"
               controlbar_height="40"
               controlbar_offset="20"
               controlbar_offset_closed="-40"
               controlbar_overlap.no-fractionalscaling="10"
               controlbar_overlap.fractionalscaling="0"
               design_skin_images="vtourskin.png"
               design_bgcolor="0x2D3E50"
               design_bgalpha="0.8"
               design_bgborder="0"
               design_bgroundedge="1"
               design_bgshadow="0 4 10 0x000000 0.3"
               design_thumbborder_bgborder="3 0xFFFFFF 1.0"
               design_thumbborder_padding="2"
               design_thumbborder_bgroundedge="0"
               design_text_css="color:#FFFFFF; font-family:Arial;"
               design_text_shadow="1"
               />



               [[__screens__]]

        
               </krpano>
`;
