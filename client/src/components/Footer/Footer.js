import React from "react";
import "./Footer.scss";
import raygun from '../../assets/images/icon-ray.png';
function Footer() {
    return (
        <footer className="footer">
            <p><a id="phaser" href="https://www.edamam.com/" target="blank">
            <i className="far fa-file-alt gh-icon-pulse"></i></a></p>
            <p>Copyright &copy; {new Date().getFullYear()} Yum(Me)</p>
            <p><a id="github" href="https://github.com/hmlauth/Yum-me-v.3" target="blank"><i className="fab fa-github gh-icon-pulse"></i></a></p>
        </footer>
    )
}

export default Footer;