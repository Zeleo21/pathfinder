import {NavLink} from "react-router";

export default function Header() {
    return (
        <header className="border-b border-white border-solid">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a className="block text-teal-600 dark:text-teal-300" href="#">
                    <span className="sr-only">Home</span>
                    <NavLink to="/home">
                        <img src="/square.svg" alt="Logo" className="h-12 w-12"/>
                    </NavLink>
                </a>

                <div className="flex flex-1 items-center justify-between">
                    <nav aria-label="Global" >
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <NavLink
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                 to="/maze">
                                   Maze Generator
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    to="/solver"
                                >
                                   Maze Solving algorithms
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}