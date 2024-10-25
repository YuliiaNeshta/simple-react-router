import {useParams} from "../../utils/Router/hooks/useParams.tsx";


function Order() {
    //Paste here the same path format, as in your Link
    const {id} = useParams("/orders/:id");

    return (
        <div>
            <h1>Order {id}</h1>
        </div>
    );
}

export default Order;