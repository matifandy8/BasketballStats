
function Footer() {
    console.log("render Footer()")
    return (
        <footer className="bg-white rounded-lg shadow-sm dark:bg-black">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-300 sm:text-center dark:text-gray-200">© 2025 <a href="" className="hover:underline">Matias</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-300 dark:text-gray-200 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 hover:text-gray-400">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 hover:text-gray-400">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6 hover:text-gray-400">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline hover:text-gray-400">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer