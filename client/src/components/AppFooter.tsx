import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return(
    <footer className="container centered-footer">
        <div className="center-text">
            {/*<section className="bold-url">*/}
            {/*    <Link to="/" className="no-underline" style={{ color: 'white' }}>*/}
            {/*        Books.JBP*/}
            {/*    </Link>*/}
            {/*</section>*/}
            <section className="links inline-display margin-links">
                <Link to="#" className="no-underline">About</Link>
                &nbsp;|&nbsp;
                <Link to="#" className="no-underline">Contact</Link>
                &nbsp;|&nbsp;
                <Link to="#" className="no-underline">Directions</Link>
            </section>
            <section className="copyright">Copyright &copy; 2023. All Right Reserved.</section>
            <section className="social-media-icons inline-display margin-footer">
                {/* Use "#" for demo purposes, replace with actual paths as needed */}
                <Link to="#" className="button round-icon">
                    <i className="fab fa-youtube"></i>
                </Link>
                &nbsp;
                <Link to="#" className="button round-icon">
                    <i className="fab fa-twitter"></i>
                </Link>
                &nbsp;
                <Link to="#" className="button round-icon">
                    <i className="fab fa-facebook"></i>
                </Link>
                &nbsp;
                <Link to="#" className="button round-icon">
                    <i className="fab fa-instagram"></i>
                </Link>
                &nbsp;
                <Link to="#" className="button round-icon">
                    <i className="fab fa-pinterest"></i>
                </Link>
            </section>
        </div>
    </footer>
)
}
export default AppFooter;
