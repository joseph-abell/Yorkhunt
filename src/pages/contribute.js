import React, { useState } from 'react';
import { navigate } from 'gatsby-link'
import Layout from '../components/Layout'

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

const Contribute = () => {
  const [formState, setFormState] = useState({});

  const handleChange = (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formState,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
  <Layout>
    <main>
      <section className="section">
        <div className="container">
          <div className='content'>
            <h2 className='subtitle'>Contribute</h2>
            <p>Got an idea for a new treasure map? Seen a mistake? Let us know, and we will give you credit when your contribution makes it in.</p>
            <form
              name="suggest-map"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              action='/contribute-success/'
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="suggest-map" />

              <p hidden>
                <label htmlFor='botField'>
                  Don’t fill this out:
                </label>
                <input name="bot-field" id='botField' onChange={handleChange} />
              </p>
            
              <div>
                <p>
                  <label htmlFor='name'>Name: * (Used for credits)</label>
                  <input id='name' type='text' style={{ borderRadius: '4px', border: '1px solid #bbb', padding: '7px' }} onChange={handleChange} />
                </p>
              </div>

              <div>
                <p>
                  <label htmlFor='contribution'>Contribution: *</label>
                
                  <textarea id='contribution' style={{ minWidth: '245px', minHeight: '100px', borderRadius: '4px', border: '1px solid #bbb' }} onChange={handleChange} />
                </p>
              </div>

              <div>
                <p>
                  <label htmlFor='email'>Email: * (Used to let you know when your contribution has made it on to the site)</label>
                  <input id='email' type='email' style={{ borderRadius: '4px', border: '1px solid #bbb', padding: '7px' }} onChange={handleChange} />
                </p>
              </div>

              <div style={{ marginTop: '30px' }}>
                <input type='submit' value='Make Contribution' />
              </div>
            </form>      
          </div>
        </div>
      </section>
    </main>
  </Layout>
)}

export default Contribute;