import Options from "./Options";
import '../css/Upgrades.css'

const Upgrades = ( { saveGame }) => {
    return(
        <div className="upgrades">
            <Options saveGame={saveGame} />

            <h3>Upgrades</h3>

            <div className="upgrades-container">
                
            </div>
        </div>
    );
}

export default Upgrades;