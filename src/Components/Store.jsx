import StoreItem from './StoreItem';
import { useSelector } from 'react-redux';
import '../css/Store.css';


const Store = () => {
    const storeItems = useSelector( (state) => state.store );

    return(
        <div className="store">
            <h3 className="title">Store</h3>

            <div className="items">
                {Object.keys(storeItems).map(
                    (item) => <StoreItem key={storeItems[item].name} name={item} />
                )}
            </div>
        </div>
    );
}

export default Store;