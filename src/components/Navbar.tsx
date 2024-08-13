export default function Navbar(){
    return(
        <div className="sticky top-0 z-50 navbar w-screen bg-base-100 min-w-[28rem]">
            <div className="navbar-start sm:w-[30%] md:w-[15%]">
                <a className="btn btn-ghost text-xl">daisyUI</a>
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
                <a className="btn">Log out</a>
            </div>
        </div>
    )
}

