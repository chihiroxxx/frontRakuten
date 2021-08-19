import { Link } from "react-router-dom"

export const SideMenu = ({setMenuFlag, onClickLogOut, loginFlag}) => {
  const onClickCloseMenu = () => {
    setMenuFlag(false)
  }
  const onClickLogOutCloseMenu = () => {
    onClickLogOut()
    onClickCloseMenu()
  }
  return(


<div class="relative bg-gray-900 h-72 dark:bg-gray-800 rounded-b-lg md:hidden">
    <div class="flex flex-col sm:flex-row sm:justify-around">
        <div class="w-60 h-screen">
            <nav class="mt-4 px-6">
                <a onClick={onClickCloseMenu}
                class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-100 dark:text-gray-400 rounded-lg " href="#">
                <span class="flex-grow text-right pr-2">
                    <Link to="/">
                    HOME
                    </Link>
                    </span>
                </a>
                <a onClick={onClickCloseMenu}
                class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-100 dark:text-gray-400 rounded-lg " href="#">
                    <span class="flex-grow text-right pr-2">
                    <Link to="/login">
                    LOG IN
                    </Link>
                    </span>
                </a>
                {loginFlag &&
                <>

                <a onClick={onClickLogOutCloseMenu}
                class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-100 dark:text-gray-400 rounded-lg " href="#">

                    <span class="flex-grow text-right pr-2">
                    LOG OUT

                    </span>
                </a>
                <a onClick={onClickCloseMenu}
                class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-100 dark:text-gray-400 rounded-lg " href="#">
                    <span class="flex-grow text-right pr-2">
                    <Link to="/index">
                    INDEX
                    </Link>
                    </span>
                </a>
                </>
                }
            </nav>
        </div>
    </div>
</div>


  )
}
