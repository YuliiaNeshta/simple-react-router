import Link from "../../utils/Link";

function  Dashboard() {
    const ordersIds = [1, 2, 3];

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {ordersIds.map((id: number) => (
                    <li key={id}>
                        <Link to="/orders/:id" params={{id}}>
                            Order {id}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;