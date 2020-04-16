window.addEventListener 'resize', Imba:commit

import '@fortawesome/fontawesome-free/js/all'

import './index.styl'

import 'imba-router'

import Application from './application'

Imba.mount <Application route="/(:collection)*/*(:group)*/*(:id)*">
