import React from "react";
import { MapPageTemplate } from "../../templates/map-page";

const MapPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return (
      <div style={{ background: "white" }}>
        <MapPageTemplate
          {...data}
          lat={Number.parseFloat(data.lat)}
          lng={Number.parseFloat(data.lng)}
          zoom={Number.parseInt(data.zoom)}
        />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MapPagePreview;
