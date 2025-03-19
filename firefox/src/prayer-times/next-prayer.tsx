import { Button, Popover, PopoverInteractionKind} from '@blueprintjs/core';
import './next-prayer.css';
import { useEffect, useState } from 'react';
import { DEFAULT_CITY_DATA, monthNames, ONE_DAY, ONE_HOUR, ONE_MINUTE, prayerNames } from '../components/constants';
import UserLocation, { CityData } from '../components/user-location';
import { readData, storeData } from '../components/browser-utils';

function NextPrayer() {
    const [prayerTimes, setPrayerTimes] = useState({} as any);
    const [nextPrayer, setNextPrayer] = useState({
        name: ' ',
        time: null,
        diff: '00:00:00',
    });
    const [city, setCity] = useState({ id: -1, name: '', name_en:'', name_ar:'', country_en:'', country_ar:''});

    useEffect(() => {
        readData("azkarData").then((azkarData: any) => {
            console.log('reading local storage for azkarData', azkarData);
            if (azkarData?.cityData?.id > -1) {
                console.log('I am setting it with values from storage', azkarData);
                setCity(azkarData.cityData);
                if (azkarData?.prayerTimes && isToday(azkarData?.prayerTimes?.date?.timestamp)) {
                     setPrayerTimes(azkarData?.prayerTimes);
                } else {
                    callPrayerTimesApi(azkarData.cityData);
                }
            } else {
                console.log('I am setting it with DEFAULT values', azkarData);
                 updateLocation(DEFAULT_CITY_DATA);
            }
        });
    }, []); // Does not run again (except once in development)

    useEffect(() => {
        updateClosestPrayerInfo();
        // update diff every second
        const interval = setInterval(updateClosestPrayerInfo, 1000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [prayerTimes])


    function callPrayerTimesApi(cityData: CityData) {
        console.log("calling API....");
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${cityData.name_en}&country=${cityData.country_en}`;
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                storeAzkarData({
                    cityData,
                    prayerTimes: json.data
                });
                setPrayerTimes(json.data);
                console.log(prayerTimes);
            });
    }

    function storeAzkarData(value: any) {
        storeData("azkarData", value ).then(() => {
            console.log("Stored azkarData", value);
        });
    }

    function isToday(timestamp) {
        console.log(timestamp);
        const cur = new Date().getTime();
        const diff = Math.abs(cur - (timestamp * 1000));
        console.log('today diff', diff);
        return diff < ONE_DAY;
    }


    // ===== time diff start

    function updateClosestPrayerInfo() {
        console.log('updating diff');
        if (!prayerTimes?.timings) {
            return;
        }
        const keyNames = Object.keys(prayerNames);
        var recentPrayer = '';
        var recentDiff = ONE_HOUR * 24; // max so it will be replaced in first round
        for (const k in prayerTimes.timings) {
            if (keyNames.includes(k)) {
                const diff = getTimeDiff(prayerTimes.timings[k]);
                if (diff > 0 && diff < recentDiff) {
                    recentDiff = diff;
                    recentPrayer = k;
                }
            }
        }

        if (recentDiff ===  ONE_HOUR * 24) {
            // TODO handling eshaa to do it better later on
            recentDiff = getTimeDiff(prayerTimes.timings['Isha']);
            recentPrayer = 'Isha'
        }

        var diffx = recentDiff;
        const hour = Math.floor(diffx / ONE_HOUR);
        diffx = diffx - (hour * ONE_HOUR);
        const min = Math.floor(diffx / ONE_MINUTE);
        diffx = diffx - (min * ONE_MINUTE);
        const sec = Math.floor(diffx / 1000);
        const diff = `${formateTime(hour, min, sec)}`;
        setNextPrayer({
            name: prayerNames[recentPrayer],
            time: prayerTimes.timings[recentPrayer],
            diff,
        })
    }

    function getTimeDiff(time: string) {
        const currentTime = new Date();
        const split = time.split(':')
        var temp = new Date();
        temp.setHours(+split[0]);
        temp.setMinutes(+split[1]);
        temp.setSeconds(0);
        temp.setMilliseconds(0)
        return temp.getTime() - currentTime.getTime();
    }

    function formateTime(hour: number, min: number, sec: number) {
        return hour.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':' +
            min.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ':' +
            sec.toLocaleString('en-US', { minimumIntegerDigits: 2 });

    }
    // ==== time diff end

    function getGregorianDate() {
        const d = prayerTimes?.date?.gregorian;
        if (d) {
            return parseInt(d.day) + ' ' + monthNames[d.month.en] + ' ' + d.year;
        }
        return '';
    }

    function getHijriDate() {
        const d = prayerTimes?.date?.hijri;
        if (d) {
            return d.day + ' ' + d.month.ar + ' ' + d.year;
        }
        return '';
    }

    function updateLocation(data: CityData) {
        if (data.id !== city.id) {
            setCity(data);
            callPrayerTimesApi(data);
        }
    }

    return (
        <div className='nextprayer-wrapper'>
            <span>{nextPrayer.diff}</span>
            <span>{nextPrayer.name}</span>
            <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY} content={
                <>
                    {prayerTimes.timings &&
                        <div className="prayer-times-container">
                            <div className="w-layout-hflex prayer-header">
                                <div className="hijri-date">{getHijriDate()}</div>
                                <div className="location">
                                    <UserLocation city={city} setCity={updateLocation} />
                                </div>
                                <div className="date">{getGregorianDate()}</div>
                            </div>
                            <div className="w-layout-hflex prayer-list">
                                {
                                    Object.keys(prayerNames).map((key, index) => (
                                        <div className={'w-layout-vflex time-card' + (nextPrayer.name === prayerNames[key] ? '-next' : '')} key={index}>
                                            <div className="card-name">{prayerNames[key]}</div>
                                            <div className="card-time">{prayerTimes.timings[key]}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>}
                </>}
                placement='bottom' minimal={true}>
                <Button icon='geotime' minimal={true} className='prayer-more-btn'/>
                
            </Popover>
        </div>
    );
}

export default NextPrayer;
