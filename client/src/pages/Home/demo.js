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
		               <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/256/sign-up-icon.png" alt=""/>
		               <h3>Sign up</h3>
		               <p>
								Create a Yum(Me) account. </p>
		               <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-3/256/sign-up-icon.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		         <div className="col-lg-4 text-center">
		            <div className="process-box">
		               <img src="https://cdn2.iconfinder.com/data/icons/ui-1/75/19-512.png" alt=""/>
		               <h3>Explore</h3>
		               <p> Search your favorite recipes. </p>
		               <img src="https://cdn2.iconfinder.com/data/icons/ui-1/75/19-512.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		         <div className="col-lg-4 text-center">
		            <div className="process-box">
		               <img src="https://cdn4.iconfinder.com/data/icons/food-and-drinks-2-8/36/179-512.png" alt=""/>
		               <h3>Develop</h3>
		               <p>Make it your own! </p>
		               <img src="https://cdn4.iconfinder.com/data/icons/food-and-drinks-2-8/36/179-512.png" alt="" className="bg-icon"/>
		            </div>
		         </div>
		      </div>
		   </div>
		</section>
  	);
  }
}

 export default Demo;
