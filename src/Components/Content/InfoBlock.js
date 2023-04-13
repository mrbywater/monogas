import "./InfoBlock.scss"

const InfoBlock = (props) => {

    const {
        headline,
        text,
        img
    } = props

        if (props.index % 2 === 0) {
            return (
                <div className="servicesButtonCont">
                    <div className="infoBlocks">
                        <h2>{headline}</h2>
                        <p>{text}</p>
                    </div>
                    <div className="infoBlocks">
                        <img src={img} className="imgSizeForBlocks"/>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="servicesButtonCont">
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