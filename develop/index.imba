window.addEventListener 'resize', Imba:commit

import './index.styl'

import 'imba-router'

import Application from './application'
import Pittance as Main, Header, Footer from './main'

Imba.mount <Application route="/(:collection)*/*(:group)*/*(:id)*">
Imba.mount <Header>
Imba.mount <Main>
Imba.mount <Footer>


