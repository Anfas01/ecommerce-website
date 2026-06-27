import { Link } from "react-router-dom"


function BackBtn() {
  return (
    <Link to="/" className="back-btn-circle" aria-label="Cancel purchase transaction steps execution layout flow and return home">
      <i className="fa-solid fa-arrow-left"></i>
    </Link>
  )
}

export default BackBtn