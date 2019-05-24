import React from 'react';
import "./App.css";


class Demo extends React.Component {
  render() {
  	return (
		<section className="work" id="work">
		   <div className="container">
		      <div className="row">
		         <div className="col-md-8 offset-md-2 text-center">
		            <div className="section-title">
		               <h1> How Yum(Me) Works</h1>
		            </div>
		         </div>
		      </div>
		      <div className="row">
		         <div className="col-lg-4 text-center">
		            <div className="process-box">
		               <img src="/images/icon/1.png" alt=""/>
		               <h3>Sign up</h3>
		               <p>
								Create a Yum(Me) account. </p>
		               <img src="/images/icon/1.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		         <div className="col-lg-4 text-center">
		            <div className="process-box">
		               <img src="/images/icon/2.png" alt=""/>
		               <h3>Explore</h3>
		               <p> Search your favorite recipes. </p>
		               <img src="/images/icon/2.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		         <div className="col-lg-4 text-center">
		            <div className="process-box">
		               <img src="/images/icon/3.png" alt=""/>
		               <h3>Develop</h3>
		               <p>Make it your own! </p>
		               <img src="/images/icon/3.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		      </div>
		   </div>
		</section>
  	);
  }
}

 export default Demo;
