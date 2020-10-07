import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

const MyMapComponent = withScriptjs(
    withGoogleMap(
      ({ zoom, lat, lng }) => (
        <GoogleMap defaultZoom={zoom} defaultCenter={{ lat, lng }} />
      )
    )
  )

export const MapPageTemplate = ({
  lat,
  lng,
  zoom,
  title,
}) => (
  <main>
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="tile">
            <h1 className="title">{title}</h1>
          </div>
          <div className="tile">
            <MyMapComponent
              lat={lat}
              lng={lng}
              zoom={zoom}
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBoJCzx8150auuR_Ffkh7qr43e-2hRWg0A'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px`, width: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </div>
      </div>
    </section>
  </main>
)

MapPageTemplate.propTypes = {
  title: PropTypes.string,
  lat: PropTypes.string,
  lng: PropTypes.string,
  url: PropTypes.string,
  zoom: PropTypes.string,
}

const MapPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <MapPageTemplate
        title={frontmatter.title}
        lat={Number.parseFloat(frontmatter.lat)}
        lng={Number.parseFloat(frontmatter.lng)}
        zoom={Number.parseInt(frontmatter.zoom)}
      />
    </Layout>
  )
}

MapPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default MapPage;

export const pageQuery = graphql`
  query MapPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "map-page" } }) {
      frontmatter {
        title
        lat
        lng
        zoom
      }
    }
  }
`
