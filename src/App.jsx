import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [developer, setDeveloper] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setErrorMessage('Please enter a GitHub username.');
      setDeveloper(null);
      setRepositories([]);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setDeveloper(null);
      setRepositories([]);

      const userResponse = await fetch(
        `https://api.github.com/users/${cleanUsername}`
      );

      if (!userResponse.ok) {
        throw new Error('GitHub user not found.');
      }

      const userData = await userResponse.json();

      const repositoriesResponse = await fetch(
        `https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=6`
      );

      if (!repositoriesResponse.ok) {
        throw new Error('Unable to load repositories.');
      }

      const repositoriesData = await repositoriesResponse.json();

      setDeveloper(userData);
      setRepositories(repositoriesData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <section className="text-center mb-5">
        <h1 className="fw-bold">GitHub Developer Finder</h1>
        <p className="text-muted">
          Search GitHub developers and explore their public repositories.
        </p>
      </section>

      <section className="card shadow-sm p-4 mb-4">
        <h2 className="h5 mb-3">Search developer</h2>

        <form className="input-group" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Example: torvalds"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <button className="btn btn-dark" type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {errorMessage && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            {errorMessage}
          </div>
        )}
      </section>

      {developer && (
        <section className="row g-4">
          <div className="col-12 col-lg-4">
            <article className="card shadow-sm p-4 h-100">
              <div className="text-center">
                <img
                  src={developer.avatar_url}
                  alt={`${developer.login} avatar`}
                  className="profile-avatar mb-3"
                />

                <h2 className="h4 mb-1">
                  {developer.name || developer.login}
                </h2>

                <p className="text-muted mb-3">@{developer.login}</p>

                {developer.bio && <p>{developer.bio}</p>}

                <a
                  href={developer.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark w-100"
                >
                  View GitHub Profile
                </a>
              </div>

              <hr />

              <div className="row text-center">
                <div className="col">
                  <strong>{developer.public_repos}</strong>
                  <p className="text-muted mb-0 small">Repos</p>
                </div>

                <div className="col">
                  <strong>{developer.followers}</strong>
                  <p className="text-muted mb-0 small">Followers</p>
                </div>

                <div className="col">
                  <strong>{developer.following}</strong>
                  <p className="text-muted mb-0 small">Following</p>
                </div>
              </div>
            </article>
          </div>

          <div className="col-12 col-lg-8">
            <article className="card shadow-sm p-4 h-100">
              <h2 className="h5 mb-3">Recently updated repositories</h2>

              {repositories.length === 0 ? (
                <p className="text-muted mb-0">
                  This user does not have public repositories.
                </p>
              ) : (
                <div className="row g-3">
                  {repositories.map((repository) => (
                    <div className="col-12 col-md-6" key={repository.id}>
                      <div className="border rounded p-3 h-100">
                        <h3 className="h6">
                          <a
                            href={repository.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                          >
                            {repository.name}
                          </a>
                        </h3>

                        <p className="text-muted small">
                          {repository.description ||
                            'No description available.'}
                        </p>

                        <div className="d-flex justify-content-between small">
                          <span>
                            {repository.language || 'N/A'}
                          </span>

                          <span>
                            ⭐ {repository.stargazers_count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;