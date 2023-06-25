import { Link } from "react-router-dom";

export const Header = () => {
    return (
      <div className="border-bottom p-2">
        <Link to="/" className="btn btn-primary me-4">Home</Link>
        <Link to="/tokens" className="btn btn-primary me-4">Tokens</Link>
      </div>
    );
  };
  