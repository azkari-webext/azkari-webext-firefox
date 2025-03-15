import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { DEFAULT_CITY_DATA } from "./constants";

export interface x {
  title: string;
}

export interface CityData {
  id: number;
  name_en: string;
  country_en: string;
  name_ar: string;
  country_ar: string;
  name: string;
}

interface UserLocationProps {
  city: CityData,
  setCity: (x) => void,
}

// load data once
const fe = fetch(`./data/world_cities.csv`)
        .then(res => res.text())
        .then(stringData => {
          console.log("reading Csv");
          return stringData;
        });
//

function UserLocation(props: UserLocationProps) {
  const [allCitiesData, setAllCitiesData] = useState<CityData[]>([]);


  useEffect(() => {
    fe.then(parseCsvData);
  }, []);
  const parseCsvData = (stringData) => {
    const lines = stringData.split('\r\n');
    let all_cities: CityData[] = [];
    let index = 0;
    for (const x of lines) {
      const temp = x.split(',');
      all_cities.push({ id: index, name_en: temp[2], country_en: temp[3], name_ar: temp[0], country_ar: temp[1], name: temp[0] + '، ' + temp[1] })
      index = index + 1;
    }
    all_cities.shift();
    setAllCitiesData(all_cities);
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
    props.setCity(item);
  }

  const formatResult = (item) => {
    return (
      <div className="autocomplete-result-item"> {item.name}</div>
    )
  }


  return (
    <ReactSearchAutocomplete
      items={allCitiesData}
      onSelect={handleOnSelect}
      autoFocus
      formatResult={formatResult}
      showIcon={false}
      showClear={false}
      showNoResultsText={"لا توجد نتائج"}
      placeholder={props.city?.name ?? DEFAULT_CITY_DATA.name}
      className="autocomplete"
      styling={{
        height: '30px',
        borderRadius: "10px",
        fontSize: "14px",
      }}
    />
  )


}

export default UserLocation;
