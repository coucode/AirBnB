import './Footer.css'
function Footer() {

  return (
    <div className="footer-container">
      <div className='splash-dev-text'>
        Like my work? Check out my 
        <a href="https://github.com/coucode" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-github fa-2xl devLinks"></i>
        </a>
        Github and 
        <a href="https://www.linkedin.com/in/ceciliasou" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin fa-2xl devLinks"></i>
        </a>
        LinkedIn
      </div>
      {/* <div className='splash-links' >
        <a href="https://github.com/coucode" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-github fa-2xl devLinks"></i>
        </a>
        <a href="https://www.linkedin.com/in/ceciliasou" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-linkedin fa-2xl devLinks"></i>
        </a>
      </div> */}
    </div>
  )

}

export default Footer