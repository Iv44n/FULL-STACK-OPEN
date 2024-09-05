import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(function Togglable(
  { children, buttonLabel },
  refs
) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => { toggleVisibility })

  return (
    <>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string,
  children: PropTypes.node
}

export default Togglable
