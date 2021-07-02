import * as Action from './actionTypes';

const faker = require('faker');
const approx = require('approximate-number');

const initialState = {
    bakeryName: `${faker.animal.dog()}'s bakery`,
    cookies: 0,
    cookieProductionRate: 0,
    store: {
        cursor: {
            name: "cursor",
            displayPrice: approx(10),
            price: 10,
            count: 0,
            productionIncrease: 0.1
        },

        grandma: {
            name: "grandma",
            displayPrice: approx(100),
            price: 100,
            count: 0,
            productionIncrease: 1
        },

        farm: {
            name: "farm",
            displayPrice: approx(1_100),
            price: 1_100,
            count: 0,
            productionIncrease: 8
        },

        mine: {
            name: "mine",
            displayPrice: approx(12_000),
            price: 12_000,
            count: 0,
            productionIncrease: 47
        },

        factory: {
            name: "factory",
            displayPrice: approx(130_000),
            price: 130_000,
            count: 0,
            productionIncrease: 260
        },

        bank: {
            name: "bank",
            displayPrice: approx(1_400_000),
            price: 1_400_000,
            count: 0,
            productionIncrease: 1_400
        },

        temple: {
            name: "temple",
            displayPrice: approx(20_000_000),
            price: 20_000_000,
            count: 0,
            productionIncrease: 7_800
        },

        wizardTower: {
            name: "wizard tower",
            displayPrice: approx(330_000_000),
            price: 330_000_000,
            count: 0,
            productionIncrease: 44_000
        },

        shipment: {
            name: "shipment",
            displayPrice: approx(5_100_000_000),
            price: 5_100_000_000,
            count: 0,
            productionIncrease: 260_000
        },

        alchemyLab: {
            name: "alchemy lab",
            displayPrice: approx(75_000_000_000),
            price: 75_000_000_000,
            count: 0,
            productionIncrease: 1_600_000
        }

        
    },
    updatePrice: (price) => {
        return Math.ceil(price * 1.15)
    },
    getRandomName: () => faker.animal.dog(),

    getReadablePrice: (price) => approx(price)
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Action.INCREMENT_COOKIES:
            return {
                ...state,
                cookies: state.cookies + 1
            };

        case Action.AUTO_INCREMENT:
            return {
                ...state,
                cookies: state.cookies + state.cookieProductionRate,
            }

        case Action.BUY_ITEM:
            const updatedItemName = action.payload.itemInfo.name;
            const updatedItem = {};
            updatedItem[updatedItemName] = action.payload.itemInfo;
            const additionalProductionRate = action.payload.itemInfo.productionIncrease;
            return {
                ...state,
                cookies: action.payload.cookies,
                cookieProductionRate: ((state.cookieProductionRate*1e7) + (additionalProductionRate*1e7)) / 1e7,
                store: {
                    ...state.store,
                    ...updatedItem
                }
            }

        case Action.LOAD_SAVE:
            return {
                ...state,
                bakeryName: action.payload.bakeryName,
                cookies: action.payload.cookies,
                cookieProductionRate: action.payload.cookieProductionRate,
                store: {
                    ...action.payload.store
                }
            }

        case Action.ADD_COOKIES:
            return {
                ...state,
                cookies: state.cookies + action.payload
            }

        case Action.CHANGE_BAKERY_NAME:
            return {
                ...state,
                bakeryName: action.payload
            }

        case Action.SET_COOKIES:
            return {
                ...state,
                cookies: action.payload
            }

        default:
            return state;
    }
}

export default reducer;