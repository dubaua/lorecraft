import { initApp } from './App';

const appRootNode = document.createElement('div');
appRootNode.id = 'react-app';
appRootNode.classList.add('root');
document.body.appendChild(appRootNode);

initApp(appRootNode);
