import "./Content.scss"

const BelowHeaderImage = (props) => {

    const {headline} = props

    return (
        <div className="belowHeader" id="pagination">
            <h1>{headline}</h1>
        </div>
    )
}

export {BelowHeaderImage}