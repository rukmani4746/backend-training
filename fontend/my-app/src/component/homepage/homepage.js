// import React from 'react'
// import "./homepage.css"
// function Homepage() {
//     return (

//         <nav class="navbar navbar-dark bg-dark">

//             <div class="container-fluid">
//                 <a class="navbar-brand" href="#">Navbar</a>
//                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-
//                     label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         <li class="nav-item">
//                             <a class="nav-link active" aria-current="page" href="#">Home</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="#">Link</a>
//                         </li>
//                         <li class="nav-item dropdown">
//                             <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-
//                                 expanded="false">
//                                 Dropdown
//                             </a>
//                             <ul class="dropdown-menu">
//                                 <li><a class="dropdown-item" href="#">Action</a></li>
//                                 <li><a class="dropdown-item" href="#">Another action</a></li>
//                                 <li><hr class="dropdown-divider" /></li>
//                                 <li><a class="dropdown-item" href="#">Something else here</a></li>
//                             </ul>
//                         </li>
//                         <li class="nav-item">
//                             <a href='#' class="nav-link disabled">Disabled</a>
//                         </li>
//                     </ul>
//                     <form class="d-flex" role="search">
//                         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                         <button class="btn btn-outline-success" type="submit">Search</button>
//                     </form>
//                 </div>
//             </div>

//         </nav>


//     )
// }

// export default Homepage
import React from "react";
import PropTypes from "prop-types";

export default function Navbar(Props) {
    return (
        <div>
            {" "}
            <nav className={`navbar navbar-expand-lg ${Props.mode} bg-${Props.mode}`}>
                <div className={`container-fluid text-${(Props.mode == "light") ? "dark" : "light"}`}>
                    <a className={`navbar-brand text-${(Props.mode == "light") ? "dark" : "light"}`} href="/">
                        {Props.title}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item text-light">
                                <a
                                    className={`nav-link active text-${(Props.mode == "light") ? "dark" : "light"}`}
                                    aria-current="page"
                                    href="/"
                                >
                                    {Props.Home}
                                </a>
                            </li>
                            <li className={`nav-item text-${(Props.mode == "light") ? "dark" : "light"}`}>
                                <a
                                    className={`nav-link text-${(Props.mode == "light") ? "dark" : "light"}`}
                                    href="https://www.google.com"
                                >
                                    Link
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className={`nav-link dropdown-toggle text-${(Props.mode == "light") ? "dark" : "light"}`}
                                    href="/"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="/">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item " href="/">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item " href="/">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link disabled text-${(Props.mode == "light") ? "dark" : "light"}`}>Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success " type="submit">
                                Search
                            </button>
                        </form>
                        <div class={`form-check form-switch text-${(Props.mode == "light") ? "dark" : "light"}`}>
                            <input
                                class="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                onClick={Props.changeMode}
                            />
                            <label class="form-check-label" htmlFor="flexSwitchCheckDefault">
                                DarkMode
                            </label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
Navbar.prototype = {
    Home: PropTypes.string,
};
