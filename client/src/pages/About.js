import React from 'react'
import Layout from './../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={'About-us Ecommerce'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
          src="/images/about.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
          />
        </div>
        <div className='col-md-4'>
          <p className="text-justify mt-2">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla omnis sit corporis nobis alias culpa. Veniam cupiditate facilis possimus ad inventore quia. Quisquam sequi ratione praesentium, quasi neque nam quae sed dignissimos, vero illo, ut repellat iure. Tempore cupiditate assumenda dicta facere quasi aut asperiores, culpa incidunt provident quo neque illo ab? Tempora porro quam deserunt eligendi. Quae 
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
