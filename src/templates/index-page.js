import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  mainpitch,
  maps
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
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                  {maps && (
                    <div className="tile">
                      <ul>
                        {maps.map(m => (
                          <li key={m.slug}>
                            <Link to={m.slug}>
                              {m.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
)

IndexPageTemplate.propTypes = {
  mainpitch: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const maps = data.maps.edges.map(m => ({ slug: m.node.fields.slug, lat: m.node.frontmatter.lat, lng: m.node.frontmatter.lng, title: m.node.frontmatter.title }));

  return (
    <Layout>
      <IndexPageTemplate
        mainpitch={frontmatter.mainpitch}
        maps={maps}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    maps: PropTypes.array
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        mainpitch {
          title
          description
        }
      }
    }

    maps: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "map-page"}}}) {
      edges {
        node {
          frontmatter {
            lat
            lng
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
