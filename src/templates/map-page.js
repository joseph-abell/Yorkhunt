import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";

export const MapPageTemplate = ({
  lat,
  lng,
  zoom,
  title,
  deck,
  credits,
  markers,
}) => (
  <main>
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="tile">
            <h1 className="title">{title}</h1>
          </div>
          <div className="tile">
            <p>{deck}</p>
          </div>
          <div className="tile" style={{ height: '400px' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyBoJCzx8150auuR_Ffkh7qr43e-2hRWg0A' }}
              defaultZoom={zoom}
              defaultCenter={{ lat, lng }}
            >
              {markers.map((marker) => (
                <div key={marker.title} lat={lat} lng={lng}>Pointer</div>
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

MapPageTemplate.propTypes = {
  title: PropTypes.string,
  deck: PropTypes.string,
  lat: PropTypes.string,
  lng: PropTypes.string,
  url: PropTypes.string,
  zoom: PropTypes.string,
  credits: PropTypes.array,
  markers: PropTypes.array,
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
        }
      }
    }
  }
`;
