import { useDispatch, useSelector, connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import * as Action from '../actionTypes';
import '../css/Cookie.css';

const mapStateToProps = (state) => {
    return {
        cookies: state.cookies,
        cookieProductionRate: state.cookieProductionRate
    }
}

const Cookie = (props) => {
    const dispatch = useDispatch()
    const [bakeryName, setBakeryName] = useState(useSelector(state => state.bakeryName))
    const [show, setShow] = useState(false)
    const [inputBakeryName, setinputBakeryName] = useState(bakeryName)
    const getRandomName = useSelector(state => state.getRandomName )
    const handleClose = () => {
        setBakeryName(bakeryName)
        setinputBakeryName(bakeryName)
        setShow(false)
    }
    const handleShow = () => {
        setinputBakeryName(inputBakeryName)
        setShow(true)
    }
    const handleConfirmBakeryName = (event) => {
        setBakeryName(inputBakeryName)
        setShow(false)
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
                    <div className="bakery-name" onClick={handleShow}>{bakeryName}</div>
                    <div className="cookie-info">
                        <div className="cookie-count">{Math.floor(props.cookies)} cookies</div>
                        <div className="cookie-rate">per second: {props.cookieProductionRate}</div>
                    </div>
                </div>

                <div id="cookie" onClick={handleCookieClick}></div>
            </div>
        </>
    );
}

export default connect(mapStateToProps)(Cookie);