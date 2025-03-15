import myData from './data.json';

function RandomZekr() {
    const allAzkar = myData.azkar;
    const minute = new Date().getMinutes();
    const index = minute % allAzkar.length;
    const zekr = myData.azkar[index];
    
    return (
            <section className="hero">
            <div className="hero-wrapper">
                <h1 className="hero-header">{zekr}</h1>
            </div>
    </section>
    );
}

export default RandomZekr;
