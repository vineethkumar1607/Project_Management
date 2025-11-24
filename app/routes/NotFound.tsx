import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="grid min-h-full place-items-center bg-white dark:bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Page not found
        </h1>

        <p className="mt-6 text-lg font-medium text-gray-500 dark:text-zinc-400 sm:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </button>

          <Link
            to="/"
            className="text-sm font-semibold text-gray-900 dark:text-white"
          >
            Go home →
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
