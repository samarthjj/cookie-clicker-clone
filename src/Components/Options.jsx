import '../css/Options.css'

const Options = ({ saveGame }) => {
    return(
        <div className="options">
            <h3>Options</h3>

            <button id="save" onClick={saveGame} className="m-2 btn btn-primary">Save Game</button>
            <button id="reset" className="m-2 btn btn-danger">Reset Progress</button>
            <button id="stats" className="m-2 btn btn-success">Show Stats</button>
        </div>
    );
}

export default Options;