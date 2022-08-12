const fs = require("fs");


const generateUrl = (props) => {
  const slug = props?.SiteName?.replace(/\s/g, '-').replace(/---/g, '-');
  let uri = `/${props.SeatID}-${slug}`;
  if (!slug) {
    uri = `/${props.SeatID}-Seat`;
  }
  console.log(uri);
  return uri;
}

fs.readFile("./Seat_(OpenData).geojson", "utf8", (err, data) => {
  const imageIndex = [];
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    const json = JSON.parse(data);

    // print all databases
    const images = json.features.filter(feature => {
      return (feature.properties.Photo !== null);
    }).map((feature, index) => {
      const props = feature.properties;
      const year = props?.CommissionDate?.split('-')[0];
      const photo = props?.Photo?.replace(' ', '%20').replace('.jpg', '').replace('.JPG', '');
      // 1024 768 640 480 320 240 160
      // const sizes = "(max-width: 1023px) 780w, (max-width: 779px) 640w, (max-width: 639px) 480w, (max-width: 479px) 320w, (max-width: 320px) 200w, (max-width: 200px) 100w, 1024px";
      return {
        loading: 'lazy',
        original: `/img/${photo}-640.webp`,
        thumbnail: `/img/${photo}-160.webp`,
        thumbnailLoading: 'lazy',
        srcSet: `/img/${photo}-1024.webp 1024w, /img/${photo}-768.webp 768w, /img/${photo}-640.webp 640w, /img/${photo}-480.webp 480w, /img/${photo}-320.webp 320w, /img/${photo}-240.webp 240w, /img/${photo}-160.webp 160w`,
        originalTitle: props.SiteName,
        description: `${props.SiteName} | ${props.AssetLongDescription} (${year}) ${props.SeatingConstruction} / ${props.FrameConstruction}`,
        originalAlt: props.SiteName,
        thumbnailAlt: props.SeatID + "",
        uri: generateUrl(props),
      };
    });

    for (let i = 0; i * 100 < images.length; i++) {
      let idx = i * 100;
      const slice = images.slice(idx,idx+100)
      slice.forEach(image => {
        imageIndex.push([image.thumbnailAlt, idx]);
      });
      fs.writeFileSync(__dirname + `/../frontend/public/data/images${idx}.json`, JSON.stringify(slice));
    }

    fs.writeFileSync(__dirname + `/../frontend/src/imageIndex.json`, JSON.stringify(imageIndex));
    fs.copyFileSync(__dirname + "/../frontend/public/data/images0.json", __dirname + "/../frontend/src/images0.json");

    const features = json.features.map((feature, index) => {
      const props = feature.properties;
      const photo = props?.Photo?.replace(' ', '%20').replace('.jpg', '');
      return {
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          seatId: props.SeatID + "",
          siteName: props.SiteName,
          thumbnail: (photo != null) ? `/img/${photo}-160.webp` : '',
          uri: generateUrl(props),
        }
      }
    });

    const geo = {
        type: "FeatureCollection",
        name: "vwOpenDataSeat",
        crs: { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: features,
    };
    fs.writeFileSync("./geo.json", JSON.stringify(geo));
    fs.copyFileSync("./geo.json", __dirname + "/../frontend/src/geo.json");
  }
});
