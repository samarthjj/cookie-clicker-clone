import * as Action from './actionTypes';

const faker = require('faker');
// const approx = require('approximate-number');
const format = (numCookies) => {
    let cookies = Math.floor(numCookies).toString()
    const length = cookies.length

    if(length <= 3){
        return cookies;
    }
    else if(length <= 6){
        let right = cookies.slice(length-3, length)
        let left = cookies.slice(0, length-3)
        return `${left},${right}`
    }
    else{
        const successorLookup = {6: "Million", 9: "Billion", 12: "Trillion", 15: "Quadrillion", 18: "Quintillion",
            21: "Sextillion", 24: "Septillion", 27: "Octillion", 30: "Nonillion", 33: "Decillion"}

        let factor = 0;
        let successor = " "

        if(length <= 9){ factor = 6}
        else if(length <= 12){ factor = 9}
        else if(length <= 15){ factor = 12}
        else if(length <= 18){ factor = 15}
        else if(length <= 21){ factor = 18}
        else if(length <= 24){ factor = 21}
        else if(length <= 27){ factor = 24}
        else if(length <= 30){ factor = 27}
        else if(length <= 33){ factor = 30}
        else if(length <= 36){ factor = 33}

        if(factor !== 0){
            const right = cookies.slice(length-factor, length)
            let retVal = cookies.slice(0, length-factor)
            if(right[0] !== '0'){
                retVal += `.${right[0]}`
            }
            successor += successorLookup[factor]
            retVal += successor
            return retVal
        } else{
            return cookies
        }
    }
}

const initialState = {
    bakeryName: `${faker.animal.dog()}'s bakery`,
    cookies: 0,
    cookieProductionRate: 0,
    store: {
        cursor: {
            name: "cursor",
            displayPrice: format(10),
            price: 10,
            count: 0,
            productionIncrease: 0.1
        },

        grandma: {
            name: "grandma",
            displayPrice: format(100),
            price: 100,
            count: 0,
            productionIncrease: 1
        },

        farm: {
            name: "farm",
            displayPrice: format(1_100),
            price: 1_100,
            count: 0,
            productionIncrease: 8
        },

        mine: {
            name: "mine",
            displayPrice: format(12_000),
            price: 12_000,
            count: 0,
            productionIncrease: 47
        },

        factory: {
            name: "factory",
            displayPrice: format(130_000),
            price: 130_000,
            count: 0,
            productionIncrease: 260
        },

        bank: {
            name: "bank",
            displayPrice: format(1_400_000),
            price: 1_400_000,
            count: 0,
            productionIncrease: 1_400
        },

        temple: {
            name: "temple",
            displayPrice: format(20_000_000),
            price: 20_000_000,
            count: 0,
            productionIncrease: 7_800
        },

        wizardTower: {
            name: "wizard tower",
            displayPrice: format(330_000_000),
            price: 330_000_000,
            count: 0,
            productionIncrease: 44_000
        },

        shipment: {
            name: "shipment",
            displayPrice: format(5_100_000_000),
            price: 5_100_000_000,
            count: 0,
            productionIncrease: 260_000
        },

        alchemyLab: {
            name: "alchemy lab",
            displayPrice: format(75_000_000_000),
            price: 75_000_000_000,
            count: 0,
            productionIncrease: 1_600_000
        }

        
    },
    updatePrice: (price) => {
        return Math.ceil(price * 1.15)
    },
    getRandomName: () => faker.animal.dog(),

    getReadablePrice: (price) => format(price)
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