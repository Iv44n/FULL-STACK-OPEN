import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(function Togglable(
  { children, buttonLabel },
  refs
) {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

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

export default Togglable
