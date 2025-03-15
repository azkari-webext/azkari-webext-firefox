import './App.css';
import NextPrayer from './prayer-times/next-prayer';
import TopVisited from './components/most-visited';
import RandomZekr from './main-zekr/random-zekr';

function App() {
  return (
    <div className="App">
      <div className='bp5-dark' id='main-container'>
      <div className="navbar-wrapper">
        <div className='logo-container'>
          <a href="#"> <img src="./images/logo.png" width="60" height="60" /> </a>
        </div>
            <NextPrayer />
        </div>
        <RandomZekr/>
        <TopVisited />
        <a className='credit-link' href="https://www.freepik.com/free-vector/mosque-cloud-islamic-new-year-greeting_5288906.htm">Background designed by starline / Freepik</a>
      </div>
    </div>
  );
}

export default App;
