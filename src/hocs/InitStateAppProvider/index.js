import  useInitApp from '../../hooks/useInitApp'

function InitStateAppProvider({children,steps}) {
  useInitApp(steps)
  return (
    children
  )
}
export default InitStateAppProvider;