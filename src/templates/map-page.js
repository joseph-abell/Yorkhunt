import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const MapPageTemplate = ({
  title,
  lat,
  lng
}) => (
  <main>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{title}</h1>
                  </div>
                  <div className="tile">
                    <p>Latitude: {lat}</p>
                  </div>
                  <div className="tile">
                    <p>Longitude: {lng}</p>
                  </div>
                </div>
              </div>
            </div>
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
}

const MapPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <MapPageTemplate
        title={frontmatter.title}
        lat={frontmatter.lat}
        lng={frontmatter.lng}
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
      }
    }
  }
`
