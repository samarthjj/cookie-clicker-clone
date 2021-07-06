import { useDispatch, connect } from 'react-redux';
import { useState, useEffect } from 'react';
import '../css/StoreItem.css';
import * as Action from '../actionTypes';

const mapStateToProps = (state, ownProps) => {
    const name = ownProps.name;
    return {
        itemName: state.store[name].name,
        price: state.store[name].price,
        basePrice: state.store[name].basePrice,
        displayPrice: state.store[name].displayPrice,
        count: state.store[name].count,
        productionIncrease: state.store[name].productionIncrease,
        cookies: state.cookies,
        getUpdatedPrice: state.getUpdatedPrice,
        getPrice10: state.getPrice10,
        getPrice100: state.getPrice100,
        getReadablePrice: state.getReadablePrice
    }
}

const StoreItem = (props) => {
    const [buying, setBuying] = useState(true);
    const [buySellCount, setbuySellCount] = useState(1);
    const [displayPrice, setDisplayPrice] = useState(props.displayPrice);
    
    const dispatch = useDispatch();
    
    const handleItemClick = () => {
        
        if (buying) {
            let buyCost = props.price;
            let updatedPrice = props.getUpdatedPrice(props.price);
            
            if (buySellCount === 10) {
                buyCost = props.getPrice10(props.price);
                
            } else if (buySellCount === 100) {
                buyCost = props.getPrice100(props.price);
            }

            updatedPrice = props.price * Math.pow(1.15, buySellCount);

            if (props.cookies < buyCost) return;


            dispatch({
                type: Action.BUY_ITEM,
                payload: {
                    cookies: props.cookies - buyCost,
                    additionalProductionIncrease: props.productionIncrease * buySellCount,
                    itemInfo: {
                        name: props.name,
                        displayPrice: props.getReadablePrice(Math.ceil(updatedPrice)),
                        price: updatedPrice,
                        basePrice: props.basePrice,
                        count: props.count + buySellCount,
                        productionIncrease: props.productionIncrease
                    }
                }
            });
        
        } else {

            if (props.count === 0) return;

            const leftWith = props.count - Math.min(buySellCount, props.count);
            const updatedPrice = props.basePrice * Math.pow(1.15, leftWith);
            let cookiesSpent = 0;

            let tempVar = updatedPrice;
            for(let i=0; i<buySellCount; i++) {
                cookiesSpent += tempVar;
                tempVar = props.getUpdatedPrice(tempVar);
            }

            const cookiesToRefund = cookiesSpent / 4;

            dispatch({
                type: Action.SELL_ITEM,
                payload: {
                    cookies: props.cookies + cookiesToRefund,
                    productionDecrease: props.productionIncrease * Math.min(buySellCount, props.count),
                    itemInfo: {
                        name: props.name,
                        displayPrice: props.getReadablePrice(Math.ceil(updatedPrice)),
                        price: updatedPrice,
                        basePrice: props.basePrice,
                        count: leftWith,
                        productionIncrease: props.productionIncrease
                    }
                }
            })


        }

        setbuySellCount(1);
    }

    useEffect(() => {
        setDisplayPrice(props.displayPrice);
    }, [props.displayPrice]);

    const handleBuySellClick = (evt) => {
        setBuying(!buying);
        evt.stopPropagation();
    }

    const handlebuySellCountClick = (evt) => {
        evt.stopPropagation();
        let dispPrice = ''

        if (buySellCount === 1) {
            setbuySellCount(10);
            dispPrice = props.getReadablePrice(Math.ceil(props.getPrice10(props.price)));
        
        } else if (buySellCount === 10)  {
            setbuySellCount(100);
            dispPrice = props.getReadablePrice(Math.ceil(props.getPrice100(props.price)));
        
        } else {
            setbuySellCount(1);
            dispPrice = props.getReadablePrice(Math.ceil(props.price));
        }

        setDisplayPrice(dispPrice);

    }


    return(
        <div className="store-item" onClick={handleItemClick}>
            <div className="info">
                <div className="d-flex flex-column buy-sell-info">
                    <button className="btn btn-dark" onClick={handleBuySellClick}>{(buying)? "Buy" : "Sell"}</button>
                    <button className="mt-2 btn buy-sell-count" onClick={handlebuySellCountClick} style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>{buySellCount}</button>
                </div>
                <div className="item-info">
                    <div className="item-name">{props.itemName}</div>
                    <div className="item-price">{displayPrice}</div>
                </div>
            </div>

            <div className="item-count">{props.count}</div>
        </div>
    );
}

export default connect(mapStateToProps)(StoreItem);