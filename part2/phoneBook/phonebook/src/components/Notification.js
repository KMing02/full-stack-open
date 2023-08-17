const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    }
    if (success === true) {
      return (
        <div className='Success'>
          {message}
        </div>
      )
    } else {
      return (
        <div className='Unsuccess'>
          {message}
        </div>
      )
    }

    
}

export default Notification