import "./App.css";
import {useState, useEffect, useRef} from 'react';



function App() {

  let data = useRef('');
  
  let [cars, setCars] = useState([]);

  useEffect(()=>{
    let fetchedCars = [];

    fetch("https://city-mobil.ru/api/cars")
    .then((response) => response.json())
    .then((fetchedData) => {
     data.current = fetchedData;
    })
    .catch(() => {
alert('error');
    });

    fetchedCars =
    data.current.cars.map((car)=>{
        return(
            <div className = 'row'>
         <div className = 'cell'>{car.mark + ' ' + car.model}</div>
         //     {data.current.tariffs_list.map((tariff)=>{
          if(tariff in car['tariffs']){
            return(
            <div className = 'cell'>{car['tariffs'][tariff]['year']}</div>
            )
          } else{
            return(
              <div className = 'cell'>-</div>
            )
          }
        })}


    </div>
        )
    })
    ;

    // {cars && cars.cars.map((car)=>{
    //     return(
    //       <div className = 'row'>
    //     <div className = 'cell'>{car.mark + ' ' + car.model}</div>

    //     {cars && cars.tariffs_list.map((tariff)=>{
    //       if(tariff in car['tariffs']){
    //         return(
    //         <div className = 'cell'>{car['tariffs'][tariff]['year']}</div>
    //         )
    //       } else{
    //         return(
    //           <div className = 'cell'>-</div>
    //         )
    //       }
    //     })}





    
  },[])

  return (
    <div className="App">
      {console.log(cars)}
      <header>Header</header>

      <main>

        <aside>Sidebar</aside>

        <div className="container">

          <div className="search">
            <input className = "search_string" type="text" placeholder = "Поиск" />
            <button className = "search_button">Найти</button>
          </div>

          <div className="table">
            <div className="table_header">

              


              <div className="column_header">Марка и модель <span></span> </div>

              {cars && cars.tariffs_list.map((tariff)=>{
                return(
                  <div className="column_header">{tariff}</div>
                )
              })}

            </div>

            <div className="rows">

        

              {cars && cars.cars.map((car)=>{
                return(
                  <div className = 'row'>
                <div className = 'cell'>{car.mark + ' ' + car.model}</div>

                {cars && cars.tariffs_list.map((tariff)=>{
                  if(tariff in car['tariffs']){
                    return(
                    <div className = 'cell'>{car['tariffs'][tariff]['year']}</div>
                    )
                  } else{
                    return(
                      <div className = 'cell'>-</div>
                    )
                  }
                })}

                

                </div>
                )
              })}
              
              
            </div>

          </div>

        </div>

      </main>

      <footer>Footer</footer>

    </div>
  );
}

export default App;


      {/* <div className="row">
                <div className="cell">Audi A6</div>
                <div className="cell">2002</div>
                <div className="cell">2012</div>
                <div className="cell">2014</div>
                <div className="cell">-</div>
                <div className="cell">2017</div>
              </div>

              <div className="row">
                <div className="cell">Audi A6</div>
                <div className="cell">2002</div>
                <div className="cell">2012</div>
                <div className="cell">2014</div>
                <div className="cell">-</div>
                <div className="cell">2017</div>
              </div> */}

                            {/* <div className="column_header">Марка и модель <span></span> </div>
              <div className="column_header">Эконом</div>
              <div className="column_header">Комфорт</div>
              <div className="column_header">Комфорт+</div>
              <div className="column_header">Минивен</div>
              <div className="column_header">Бизнес</div> */}