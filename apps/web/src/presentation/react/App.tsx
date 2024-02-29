import { useContext } from 'react'
import { AppPresenter } from '../common/presenter/app/AppPresenter'
import { AppPresenterState } from '../common/presenter/app/AppPresenterState'
import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
import { NavMenu } from './components/NavMenu'
import { presenters } from './context'
import { usePresenter } from './hooks/usePresenter'

function App() {
  const { appPresenter } = useContext(presenters)

  const {
    navMenuVisible,
  } = usePresenter<AppPresenter, AppPresenterState>(appPresenter)

  return (
    <>
      <Header className='relative z-40' onNavButtonClick={() => appPresenter.navButtonClicked()} />
      <NavMenu onCloseButtonClick={() => appPresenter.closeButtonClicked()} className={`${navMenuVisible ? '' : 'hidden'} md:hidden`} />
      <MainContent className={navMenuVisible ? 'max-md:hidden' : ''} />
    </>
  )
}

export default App
