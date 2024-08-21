const generateClass = (options) => {
  return {
    width: 'fit-content',
    paddingBlock: 5,
    paddingInline: 10,
    borderRadius: 5,
    ...options,
  }
}

const Noti = ({ errorMessage, successMessage }) => {
  if (errorMessage) {
    return (
      <>
        <div
          style={generateClass({
            color: 'red',
            border: '1px solid red',
          })}
        >
          {errorMessage}
        </div>
        <br />
      </>
    )
  }

  if (successMessage) {
    return (
      <>
        <div
          style={generateClass({
            color: 'green',
            border: '1px solid green',
          })}
        >
          {successMessage}
        </div>
        <br />
      </>
    )
  }

  return null
}

export default Noti
