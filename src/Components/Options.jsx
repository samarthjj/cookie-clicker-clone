import '../css/Options.css'

const Options = ({ saveGame }) => {
    return(
        <div className="options">
            <h3>Options</h3>

            <button id="save" onClick={saveGame} className="btn btn-primary">Save Game</button>
            <button id="reset" className="btn btn-danger">Reset Progress</button>
        </div>
    );
}

export default Options;