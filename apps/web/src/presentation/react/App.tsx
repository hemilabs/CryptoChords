import { useEffect, useState } from 'react'
import { AppPresenter } from '../common/presenter/app/AppPresenter'
import { AppPresenterState } from '../common/presenter/app/AppPresenterState'
import { Header } from './components/Header'
import { MainContent } from './components/MainContent'
import { NavMenu } from './components/NavMenu'

const presenter = new AppPresenter()

function App() {
  const [{
    navMenuVisible,
  }, setState] = useState<AppPresenterState>(presenter.state)

  useEffect(() => {
    presenter.subscribe(setState)
  }, [])

  return (
    <>
      <Header className='relative z-40' onNavButtonClick={() => presenter.navButtonClicked()}/>
      <NavMenu onCloseButtonClick={() => presenter.closeButtonClicked()} className={`${navMenuVisible ? '' : 'hidden'} md:hidden`} />
      <MainContent className={navMenuVisible ? 'max-md:hidden' : ''} />
    </>
  )
}

export default App
