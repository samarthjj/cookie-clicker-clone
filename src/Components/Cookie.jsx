import { useDispatch, useSelector, connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import * as Action from '../actionTypes';
import '../css/Cookie.css';
import { motion } from 'framer-motion';

const mapStateToProps = (state) => {
    return {
        cookies: state.cookies,
        cookieProductionRate: state.cookieProductionRate,
        getReadablePrice: state.getReadablePrice,
        bakeryName: state.bakeryName
    }
}

const Cookie = (props) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [inputBakeryName, setinputBakeryName] = useState(props.bakeryName)
    const getRandomName = useSelector(state => state.getRandomName )
    const handleClose = () => {
        setinputBakeryName(props.bakeryName)
        setShow(false)
    }
    const handleShow = () => {
        setinputBakeryName(props.bakeryName)
        setShow(true)
    }
    const handleConfirmBakeryName = (event) => {
        setShow(false)
        dispatch({
            type: Action.CHANGE_BAKERY_NAME,
            payload: inputBakeryName
        });
    }
    const handleBakeryNameChange = (event) => setinputBakeryName(event.target.value)
    const handleCookieClick = () => {
        dispatch({
            type: Action.INCREMENT_COOKIES,
            payload: {}
        });
    }
    const handleRandomName = () => {
        setinputBakeryName( `${getRandomName()}'s bakery` )
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title>Name your Bakery</Modal.Title>
                </Modal.Header>

                <Modal.Body className="d-flex justify-content-center">
                    <input className="text-center w-100" type="text" value={inputBakeryName} onChange={handleBakeryNameChange} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleConfirmBakeryName}>Confirm</Button>
                    <Button variant="primary" onClick={handleRandomName}>Random</Button>
                    <Button variant="danger" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            <div className="cookie-column">
                <div className="bakery-info">
                    <div className="bakery-name" onClick={handleShow}>{props.bakeryName}</div>
                    <div className="cookie-info">
                        <h2 className="cookie-count">{props.getReadablePrice(props.cookies)} cookies</h2>
                        <div className="cookie-rate">per second: {props.getReadablePrice(
                        props.cookieProductionRate)}</div>
                    </div>
                </div>

                <motion.div 
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 1.2 }}
                    transition={{type: 'spring', duration: 0}}
                    id="cookie"
                    onClick={handleCookieClick}
                ></motion.div>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Cookie);