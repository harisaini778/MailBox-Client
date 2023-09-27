import LogIn from './components/Login';
import './App.css';
import { ThemeProvider } from 'react-bootstrap';

function App() {
  return (
<ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs">
    <div className="App">
         <LogIn /> 
    </div>
</ThemeProvider>
 );
}

export default App;
