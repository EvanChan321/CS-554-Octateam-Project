export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm mb-2 md:mb-0">Game Share &copy; {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <a
              href="https://rawg.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Powered by RAWG API
            </a>
            <a
              href="https://github.com/EvanChan321/CS-554-Octateam-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    );
  }
  