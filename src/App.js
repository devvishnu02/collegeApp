import logo from "./logo.svg";
import "./App.css";
import Students from "./table";

function App() {
  return (
    <div className="flex flex-col">
      <div class="relative w-full bg-white shadow-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div class="inline-flex items-center space-x-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 100 100"
              >
                <rect width="100%" height="100%" fill="#27ae60" />
                <circle cx="50" cy="50" r="40" fill="#fff" />
                <polygon points="20,70 50,10 80,70" fill="#c0392b" />
              </svg>
            </span>
          </div>
          <div class="hidden grow items-start lg:flex">
            <ul class="ml-12 inline-flex space-x-8">
              <li>
                <a
                  href="#"
                  class="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      <Students />
    </div>
  );
}

export default App;
