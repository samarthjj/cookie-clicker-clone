import StoreItem from './StoreItem';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../css/Store.css';


const Store = () => {
    const storeItems = useSelector( (state) => state.store );
    const [buying, setBuying] = useState(true);
    const [buySellCount, setBuySellCount] = useState(1);

    const handleBuySellClick = (evt) => {
        setBuying(!buying);
    }

    const handleBuySellCountClick = () => {
        if (buySellCount === 1) setBuySellCount(10);
        else if (buySellCount === 10) setBuySellCount(100);
        else setBuySellCount(1);
    }

    return(
        <div className="store">
            <h3 className="title">Store</h3>
            <div className="store-options">
                <button className="m-2 btn btn-dark" onClick={handleBuySellClick}>{(buying)? "Buy" : "Sell"}</button>
                <button className="m-2 btn" style={{backgroundColor: 'rgba(0,0,0,0.2)'}} onClick={handleBuySellCountClick}>{buySellCount}</button>
            </div>
            <div className="items">
                {Object.keys(storeItems).map(
                    (item) => <StoreItem key={storeItems[item].name} name={item} buying={buying} buySellCount={buySellCount} />
                )}
            </div>
        </div>
    );
}

export default Store;