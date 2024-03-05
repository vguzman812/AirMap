import { Link, useRouteError, useNavigate } from "react-router-dom";
import "./ErrorPage.css"; 
function ErrorPage() {
  const error = useRouteError();
  /* eslint-disable-next-line no-console */
  console.error(error);
  const navigate = useNavigate();

  return (
    <div className="error-page" id="error-page">
      {error ? (
        <>
          <h1 className="error-heading">{error.status}</h1>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </>
      ) : (
        <>
          <h1 className="error-heading">404</h1>
          <p>Not Found. No specific error was provided.</p>
        </>
      )}
      <p className="error-text">Oops! Looks like something went wrong.</p>
      <div className="animate-bounce">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </div>
      <p className="error-text">
        Let&apos;s get you back{" "}
        <Link to="/" className="link">
          home
        </Link>
        .
      </p>
      <h3>OR</h3>
      <button
        type="button"
        className="btn-primary"
        onClick={() => navigate(-1)}
      >
        Go Back One Page
      </button>
    </div>
  );
}

export default ErrorPage;
