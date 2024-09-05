import { Link } from "react-router-dom";

interface propsType{
    visibleSubmenu: boolean,
    logoRedirectUrl: string,
}

export default function Navbar(props: propsType){
    const {visibleSubmenu, logoRedirectUrl} = props
    return(
        <div className="sticky top-0 z-50 navbar w-full bg-base-100 min-w-[28rem] shadow-lg max-h-12">
            <div className="navbar-start sm:w-[30%] md:w-[15%]">
                {visibleSubmenu && <div className="dropdown">{/*햄버거바*/}
                    <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">    
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>About</a></li>
                        <li>
                        <a>정보</a>
                        <ul className="p-2">
                            <li><a>혜택</a></li>
                            <li><a>졸업</a></li>
                        </ul>
                        </li>
                    </ul>
                </div>}
                <Link to={logoRedirectUrl} className="btn btn-ghost text-xl">KYR</Link>
            </div>
            {visibleSubmenu && <>
            <div className="navbar-start hidden sm:flex sm:w-[40%]">
                <ul className="menu menu-horizontal px-1">
                <li><a>About</a></li>
                <li>
                    <details>
                    <summary>정보</summary>
                    <ul className="p-2">
                        <li><a>혜택</a></li>
                        <li><a>졸업</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
            <div className="navbar-end sm:w-[30%] md:w-[45%]">
                <a className="btn">Sign Out</a>
            </div>
            </>}
        </div>
    )
}

