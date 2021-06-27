import StoreItem from './StoreItem';
import { useSelector } from 'react-redux';
import '../css/Store.css';


export default function Store() {
    const storeItems = useSelector( (state) => state.store );

    return(
        <div className="store">
            <div className="title">Store</div>

            <div className="items">
                {Object.keys(storeItems).map(
                    (item) => <StoreItem key={storeItems[item].name} name={item} />
                )}
            </div>
        </div>
    );
}