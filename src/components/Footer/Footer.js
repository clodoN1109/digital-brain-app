import React from 'react';
import './Footer.css';


const Footer = () => {


	return (


		<div>

			<footer  style={{margin:'10px', backgroundImage: 'url(../public/footer-background.jpg)', backgroundSize: 'cover'}}>

				<div className ="footerGrid center" style={{fontSize:'20px'}}>

					<div className="footerBox">

						<p style={{fontFamily:'courier', cursor: 'default'}}> by <a style={{transition: 'all 0s'}} href="https://clodo.me">Clodo </a></p>

						<a className="boxImage" href="https://clodo.me"></a>

						<a href="https://clodo.me" style={{transition: 'all 0s'}}>

							<div className="clodoWebAddress" style={{fontSize:'0.8rem', transition: 'all 0s'}}>{'clodo.com'}</div>
						
						</a>
					</div>

				</div>

			</footer>




		</div>




		);




}

export default Footer;