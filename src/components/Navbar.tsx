export default function Navbar(){
    return(
        <div className="sticky top-0 z-50 navbar w-screen bg-base-100 min-w-[28rem] shadow-lg max-h-12">
            
            <div className="navbar-start sm:w-[30%] md:w-[15%]">
                <div className="dropdown">{/*햄버거바*/}
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
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">KYR</a>{/*로그인을 안한 상태일 때 아래의 요소 모두 숨겨야함*/}
            </div>
            <div className="navbar-start hidden sm:flex sm:w-[40%]">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li>
                    <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end sm:w-[30%] md:w-[45%]">
                <a className="btn">Sign Out</a>
            </div>
        </div>
    )
}

