import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

const Marker = ({
  marker,
  i,
  setComplete,
  complete,
  setShowClue,
  showClue,
}) => {
  const onShowButton = () => {
    setShowClue(showClue + 1);
  };

  const onToggleComplete = (i) => {
    const newComplete = [...complete];
    newComplete[i] = !newComplete[i];

    setComplete(newComplete);

    setShowClue(-1);
  };

  return (
    <li
      key={marker.title}
      className={`marker ${complete[i] === true ? "complete" : ""}`}
    >
      {i + 1}: {marker.title}
      {marker?.clues?.length > 0 && (
        <button
          type="button"
          onClick={onShowButton}
          disabled={showClue >= marker.clues.length - 1 || complete[i]}
        >
          Show Clue
        </button>
      )}
      <button type="button" onClick={() => onToggleComplete(i)}>
        {!complete[i] && "Found"}
        {complete[i] && "Not Found"}
      </button>
      <ul className="clues">
        {marker?.clues?.map((clue, index) => (
          <li key={clue} className={showClue < index ? "hidden" : ""}>
            {index + 1}: {clue}
          </li>
        ))}
      </ul>
    </li>
  );
};

export const MapPageTemplate = ({
  lat,
  lng,
  zoom,
  title,
  deck,
  credits,
  markers,
}) => {
  const [showClue, setShowClue] = useState(-1);
  const [complete, setComplete] = useState(markers.map(() => false));

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="content">
            <div className="tile">
              <h1 className="title">{title}</h1>
            </div>
            <div className="tile" style={{ marginBottom: "40px" }}>
              {deck}
            </div>
            {markers.length > 0 && (
              <div className="tile">
                <ul>
                  {markers.map((marker, index) => {
                    return (
                      <Marker
                        marker={marker}
                        key={marker.title}
                        i={index}
                        showClue={showClue}
                        setShowClue={setShowClue}
                        complete={complete}
                        setComplete={setComplete}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
            <div
              className="tile"
              style={{ height: "400px", marginBottom: "30px" }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBoJCzx8150auuR_Ffkh7qr43e-2hRWg0A",
                }}
                defaultZoom={zoom}
                defaultCenter={{ lat, lng }}
              >
                {markers.map((marker, i) => (
                  <div
                    key={marker.title}
                    lat={marker.lat}
                    lng={marker.lng}
                    className={`marker-pointer ${
                      complete[i] ? "complete" : undefined
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </GoogleMapReact>
            </div>
            {credits.length > 0 && (
              <>
                <div className="tile">
                  <h2 className="subtitle">Credits</h2>
                </div>
                <div className="tile">
                  <ul>
                    {credits.map((credit) => (
                      <li key={credit}>{credit}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

const MapPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <MapPageTemplate
        title={frontmatter.title}
        deck={frontmatter.deck}
        lat={Number.parseFloat(frontmatter.lat)}
        lng={Number.parseFloat(frontmatter.lng)}
        zoom={Number.parseInt(frontmatter.zoom)}
        credits={frontmatter.credits}
        markers={frontmatter.markers}
      />
    </Layout>
  );
};

MapPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default MapPage;

export const pageQuery = graphql`
  query MapPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "map-page" } }) {
      frontmatter {
        title
        deck
        lat
        lng
        zoom
        credits
        markers {
          title
          lat
          lng
          clues
        }
      }
    }
  }
`;
