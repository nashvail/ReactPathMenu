import React from 'react';
import { createRoot } from 'react-dom/client';


// Component
import APP from './Components/APP.js';

const rootElement = document.getElementById('container');

const root = createRoot(rootElement);

root.render(<APP/>);