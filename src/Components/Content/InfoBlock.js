import "./InfoBlock.scss"
import "./Content.scss"

const InfoBlock = (props) => {

    const {
        headline,
        text,
        img
    } = props

        if (props.index % 2 === 0) {
            return (
                <div className="infoBlocksCont">
                    <div className="infoBlocks">
                        <h2>{headline}</h2>
                        {text.map(elm => (
                            <p>{elm}</p>
                        ))}
                    </div>
                    <div className="infoBlocks">
                        <img src={img} className="imgSizeForBlocks"/>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="infoBlocksCont">
                    <div className="infoBlocks">
                        <img src={img} className="imgSizeForBlocks"/>
                    </div>
                    <div className="infoBlocks">
                        <h2>{headline}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            )
        }
}
export {InfoBlock}