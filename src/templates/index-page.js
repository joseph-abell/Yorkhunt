import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import Layout from "../components/Layout";

export const IndexPageTemplate = ({ mainpitch, maps }) => (
  <main>
    <section className="section">
      <div className="container">
        <div className="content">
          <div className="tile">
            <h1 className="title">{mainpitch.title}</h1>
          </div>
          <div className="tile">
            <p>{mainpitch.description}</p>
          </div>
        </div>
        {maps && (
          <div className="content">
            <div className="tile">
              <ul>
                {maps
                  .sort(
                    (a, b) =>
                      Date.parse(b.publishedDate) - Date.parse(a.publishedDate)
                  )
                  .map((m) => {
                    return (
                      <li key={m.slug} className="homepage-map">
                        <Link to={m.slug}>
                          <Img
                            fixed={m.featuredImage.childImageSharp.fixed}
                            objectFit="cover"
                            objectPosition="50% 50%"
                          />
                          <h3>{m.title}</h3>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  </main>
);

IndexPageTemplate.propTypes = {
  mainpitch: PropTypes.object,
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const maps = data.maps.edges.map((m) => {
    const { frontmatter, fields } = m.node;

    return {
      ...frontmatter,
      ...fields,
    };
  });

  return (
    <Layout>
      <IndexPageTemplate mainpitch={frontmatter.mainpitch} maps={maps} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    maps: PropTypes.any,
  }),
};

export default IndexPage;

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

    maps: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "map-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            lat
            lng
            title
            deck
            featuredImage {
              childImageSharp {
                fixed(width: 300, height: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
              publicURL
            }
            publishedDate
            wheelchairAccessible
            accessibilityNotes
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
