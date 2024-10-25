import Link from "../../utils/Link";

function NotFound() {
    return (
        <div>
            <h1>Not Found :(</h1>
            <Link to="/dashboard">Return to Dashboard</Link>
        </div>
    );
}

export default NotFound;