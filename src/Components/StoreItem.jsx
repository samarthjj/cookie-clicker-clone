import { useDispatch, connect } from 'react-redux';
import '../css/StoreItem.css';
import * as Action from '../actionTypes';

function mapStateToProps(state) {
    return {
        store: state.store,
        cookies: state.cookies,
        updatePrice: state.updatePrice,
        getReadablePrice: state.getReadablePrice
    }
}

function StoreItem(props) {
    const name = props.name;
    const displayName = props.store[name].name;
    const price = props.store[name].price;
    const displayPrice = props.store[name].displayPrice
    const count = props.store[name].count;
    const productionIncrease = props.store[name].productionIncrease;
    const dispatch = useDispatch();
    const handleItemClick = () => {

        if (props.cookies < price) return;
        dispatch({
            type: Action.BUY_ITEM,
            payload: {
                cookies: props.cookies - price,
                itemInfo: {
                    name,
                    displayPrice: props.getReadablePrice(props.updatePrice(price)),
                    price: props.updatePrice(price),
                    count: count + 1,
                    productionIncrease
                }
            }
        });
    }


    return(
        <div className="store-item" onClick={handleItemClick}>
            <div className="item-info">
                <div className="item-name">{displayName}</div>
                <div className="item-price">{displayPrice}</div>
            </div>
            <div className="item-count">{count}</div>
        </div>
    );
}

export default connect(mapStateToProps)(StoreItem);