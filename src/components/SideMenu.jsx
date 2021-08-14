export const SideMenu = () => {
  return(

    <div class="flex-col w-full md:flex md:flex-row md:min-h-screen bg-blueGray-50">
    <div class="flex flex-col flex-shrink-0 w-full text-blueGray-700 bg-white shadow-xl md:w-64">
      <div class="flex flex-col items-center flex-shrink-0 bg-blueGray-50">
        <button class="p-1 m-2 ml-auto transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-blueGray-600 focus:outline-none" type="button" aria-label="Close" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M10 10l4 4m0 -4l-4 4"></path>
          </svg>
        </button>
      </div>
      <div class="flex flex-col items-center flex-shrink-0 py-4">
        <a href="/" class="w-full px-8 focus:outline-none">
          <div class="inline-flex items-center">
            <div class="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600">
            </div>
            <h2 class="block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8"> wickedblocks </h2>
          </div>
        </a>
      </div>
      <nav class="flex-grow pb-4 pr-4 md:block md:pb-0 md:overflow-y-auto">
        <ul>
          <li>
            <a class="inline-flex items-center px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform border-l-4 border-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class=" icon icon-tabler icon-tabler-credit-card" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="3" y="5" width="18" height="14" rx="3"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <line x1="7" y1="15" x2="7.01" y2="15"></line>
                <line x1="11" y1="15" x2="13" y2="15"></line>
              </svg>
              <span class="ml-4"> Prices</span>
            </a>
          </li>
          <li>
            <a class="inline-flex items-center px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform border-l-4 border-white hover:border-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-inbox" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <path d="M4 13h3l3 3h4l3 -3h3"></path>
              </svg>
              <span class="ml-4">Contact</span>
            </a>
          </li>
          <li>
            <a class="inline-flex items-center px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform border-l-4 border-white hover:border-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-artboard" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="8" y="8" width="8" height="8" rx="1"></rect>
                <line x1="3" y1="8" x2="4" y2="8"></line>
                <line x1="3" y1="16" x2="4" y2="16"></line>
                <line x1="8" y1="3" x2="8" y2="4"></line>
                <line x1="16" y1="3" x2="16" y2="4"></line>
                <line x1="20" y1="8" x2="21" y2="8"></line>
                <line x1="20" y1="16" x2="21" y2="16"></line>
                <line x1="8" y1="20" x2="8" y2="21"></line>
                <line x1="16" y1="20" x2="16" y2="21"></line>
              </svg>
              <span class="ml-4">Services</span>
            </a>
          </li>
          <li>
            <a class="inline-flex items-center px-4 py-2 mt-2 text-base text-blueGray-500 transition duration-500 ease-in-out transform border-l-4 border-white hover:border-blue-600 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-blue-600" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
              </svg>
              <span class="ml-4">About</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="flex items-center w-full p-4 rounded-lg ">
        <img src="https://dummyimage.com/302x302/F3F4F7/8693ac" alt="user name" class="object-cover w-10 h-10 mr-4 border border-white border-solid rounded-full"/>
        <div>
          <h2 class="text-sm font-medium tracking-widest text-black uppercase title-font">Rasmus Doe</h2>
          <p class="text-blueGray-500">Back-Start Developer</p>
        </div>
      </div>
    </div>
  </div>

  )
}
