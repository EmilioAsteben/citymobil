import "./App.css";
import { useState, useEffect, useRef} from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function App() {
  let data = useRef("");
  let carsToRender = useRef("");
  let [cars, setCars] = useState();
  let [carsList, setCarsList] = useState();
  let [selectedCar, setSelectedCar] = useState();
  let [filterSubstr, setFilterSubstr] = useState("");
  let [sort, setSort] = useState(true);
  let previousSelection = useRef();

  let selectCar = (car, year) => {
    console.log(selectedCar);

    if (
      previousSelection.current &&
      previousSelection.current.car === car &&
      previousSelection.current.year === year
    ) {
      setSelectedCar(false);
      previousSelection.current = "";
      return;
    }

    previousSelection.current = { car: car, year: year };
    setSelectedCar({ car: car, year: year });
  };

  const mapList = (car, index) => {
    return (
      <div key={index} className="row">
        <div className="cell">{car.mark + " " + car.model}</div>
        {data.current.tariffs_list.map((tariff, index) => {
          if (tariff in car["tariffs"]) {
            return (
              <div
                onClick={() => {
                  selectCar(
                    car.mark + " " + car.model,
                    car.tariffs[tariff].year
                  );
                }}
                key={index}
                className={"cell year"}
              >
                {car["tariffs"][tariff]["year"]}
              </div>
            );
          } else {
            return (
              <div key={index} className="cell">
                -
              </div>
            );
          }
        })}
      </div>
    );
  };

  const reverseList = () => {
    let reversedList = carsToRender.current.reverse();
    console.log(carsToRender.current);
    setCarsList([...reversedList]);
    setSort(!sort);
  };



  const filterList = (e) => {
    e.preventDefault();
    setSelectedCar(false);

    carsToRender.current = data.current.cars.filter((car) => {
      return (car.mark + car.model)
        .toLowerCase()
        .includes(filterSubstr.toLowerCase());
    });

    carsToRender.current = carsToRender.current.map(mapList);

    console.log(carsToRender.current);

    setCarsList(carsToRender.current);
  };

  useEffect(() => {
    fetch("https://city-mobil.ru/api/cars")
      .then((response) => response.json())
      .then((fetchedCars) => {
        data.current = fetchedCars;
        setCars(fetchedCars);
        carsToRender.current = data.current.cars.sort().map(mapList);
        setCarsList(carsToRender.current);
      })
      .catch(() => {
        alert("error");
      });
  }, []);

  return (
    <div className="App">
      <header>Header</header>

      <main>
        <aside>Sidebar</aside>

        <div className="container">
          <div className="search">
            <input
              onKeyDown={(e) => {
                e.key === "Enter" && filterList(e);
              }}
              onChange={(e) => {
                setFilterSubstr(e.target.value);
              }}
              className="search_string"
              type="text"
              placeholder="Поиск"
            />
            <button
              onClick={(e) => {
                filterList(e);
              }}
              className="search_button"
            >
              Найти
            </button>
          </div>

          <div className="table">
            <div className="table_header">
              <div
                onClick={() => {
                  reverseList();
                }}
                className="column_header"
              >
                Марка и модель <span>{sort ? "A-z" : "z-A"}</span>{" "}
              </div>

              {cars &&
                cars.tariffs_list.map((tariff, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        reverseList();
                      }}
                      className="column_header"
                    >
                      {tariff}
                    </div>
                  );
                })}
            </div>
            <SimpleBar style={{ maxHeight: 300 }}>
              <div className="rows">{carsList}</div>
            </SimpleBar>
          </div>
          {selectedCar && (
            <div className="selected_car">
              Выбран автомобиль {selectedCar.car} {selectedCar.year} года
              выпуска
            </div>
          )}
        </div>
      </main>

      <footer>Footer</footer>
    </div>
  );
}

export default App;
