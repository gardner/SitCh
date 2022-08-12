import React, { useState } from 'react';
import { GeoJson, Map, Overlay } from "pigeon-maps"
import geoJson from './geo.json';

function SeatMap() {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [anchor, setAnchor] = useState<[number,number]>([-43.577528, 172.789468]);
  return (
    <Map height={1000} defaultCenter={[-43.577528, 172.789468]} defaultZoom={10.56}>
      <GeoJson
        data={geoJson}
        svgAttributes={{
          strokeWidth: "1",
          stroke: "gray",
          r: "3",
        }}
        onMouseOver={({ event, anchor, payload }) => {
          setUrl(payload.properties.thumbnail);
          setAlt(payload.properties.siteName);
          console.log(payload.properties.siteName);
          setAnchor(payload.geometry.coordinates);
          console.log(payload.geometry.coordinates);
        }}
        onClick={({ event, anchor, payload }) => {
          console.log(event, anchor, payload);
        }}
      />
      <Overlay anchor={anchor} offset={[160, 80]}>
        <img src={url} width={160} alt={alt} />
      </Overlay>
    </Map>
  );
}

export default SeatMap;
