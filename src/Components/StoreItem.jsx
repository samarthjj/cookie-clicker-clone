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
    const [displayPrice, setDisplayPrice] = useState(props.displayPrice);
    
    const dispatch = useDispatch();
    
    const handleItemClick = () => {
        
        if (props.buying) {
            let buyCost = props.price;
            let updatedPrice = props.getUpdatedPrice(props.price);
            
            if (props.buySellCount === 10) {
                buyCost = props.getPrice10(props.price);
                
            } else if (props.buySellCount === 100) {
                buyCost = props.getPrice100(props.price);
            }

            updatedPrice = props.price * Math.pow(1.15, props.buySellCount);

            if (props.cookies < buyCost) return;


            dispatch({
                type: Action.BUY_ITEM,
                payload: {
                    cookies: props.cookies - buyCost,
                    additionalProductionIncrease: props.productionIncrease * props.buySellCount,
                    itemInfo: {
                        name: props.name,
                        displayPrice: props.getReadablePrice(Math.ceil(updatedPrice)),
                        price: updatedPrice,
                        basePrice: props.basePrice,
                        count: props.count + props.buySellCount,
                        productionIncrease: props.productionIncrease
                    }
                }
            });
        
        } else {

            if (props.count === 0) return;

            const leftWith = props.count - Math.min(props.buySellCount, props.count);
            const updatedPrice = props.basePrice * Math.pow(1.15, leftWith);
            let cookiesSpent = 0;

            let tempVar = updatedPrice;
            for(let i=0; i<props.buySellCount; i++) {
                cookiesSpent += tempVar;
                tempVar = props.getUpdatedPrice(tempVar);
            }

            const cookiesToRefund = cookiesSpent / 4;

            dispatch({
                type: Action.SELL_ITEM,
                payload: {
                    cookies: props.cookies + cookiesToRefund,
                    productionDecrease: props.productionIncrease * Math.min(props.buySellCount, props.count),
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
    }

    useEffect(() => {
        setDisplayPrice(props.displayPrice);

        let dispPrice = ''

        if (props.buySellCount === 1) {
            dispPrice = props.getReadablePrice(Math.ceil(props.price));
            
        } else if (props.buySellCount === 10)  {
            dispPrice = props.getReadablePrice(Math.ceil(props.getPrice10(props.price)));
            
        } else {
            dispPrice = props.getReadablePrice(Math.ceil(props.getPrice100(props.price)));
        }

        setDisplayPrice(dispPrice);

    }, [props.displayPrice, props.buySellCount]);


    return(
        <div className="store-item" onClick={handleItemClick}>
            <div className="item-info">
                <div className="item-name">{props.itemName}</div>
                <div className="item-price">{displayPrice}</div>
            </div>

            <div className="item-count">{props.count}</div>
        </div>
    );
}

export default connect(mapStateToProps)(StoreItem);