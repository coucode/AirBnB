import './Footer.css'
function Footer() {

  return (
    <div className="footer-container">
      <div className='splash-dev-info'>

        <div className='splash-dev-text'>
          <p className='splash-dev-inner-text'>Developer:</p>
          <p className='splash-dev-inner-text' style={{ color: "var(--orange-button-color)", fontSize: '30px' }}>Cecilia Ou</p>
        </div>
        <div className='splash-links' >
          <a href="https://github.com/coucode" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-square-github fa-2xl devLinks"></i>
          </a>
          <a href="https://www.linkedin.com/in/ceciliasou" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin fa-2xl devLinks"></i>
          </a>
        </div>
      </div>
    </div>
  )

}

export default Footer