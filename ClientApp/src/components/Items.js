import React, {useState, useEffect } from 'react';
import { Item } from './Item';
// import { Pages } from './Pages';
export function Items({ limit = 3 }) {

    const [items, setItems] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);
    const [pag, setPag] = useState(1);
   
    //const PagesSec = () => {
    //    var lim;
    //    console.log(data);
    //    if (data.length != 0) {

    //        lim = Math.trunc(data.length / 3);

    //    }
       
    //    let pages=[];
    //    for (let i = 0;  i<10 ; i++) {
    //        pages[i] = [{ "id": i }];
    //    }
    //    return (
    //        <div> 
    //            {(pages.map((item) => {
    //                return (<Pages key={item.id} {...item}></Pages>);
    //            }))}
    //        </div>
    //    );
        
    //}
    const getItems = (num,temp) => {
        let newArray;
        if (num == 1) {
            newArray = temp.filter((item) => (item.id >= ((num - 1) * limit) && item.id <= (num * limit)));
        } else {
             newArray = temp.filter((item) => (item.id >= ((num - 1) * limit) && item.id < (num * limit)));
        }
        
       
        return newArray;
        
        
    } 
    const getData = async () => {
        const url = "api/holder"
        await fetch(url)
            .then(async (resp) => {
                if (resp.status >= 200 && resp.status <= 299) {
                   const datatemp = await resp.json();

                    
                    const newArray = await getItems(1, datatemp);
                    
                    setItems(newArray);
                    setData(datatemp);
                    setIsLoading(false);
                }
                else {
                    setIsError(true);
                    console.log(resp.statusText);
                }

            })

    };
  
    useEffect(() => {
        getData();
        
    }, []);
    const cambiar = async (newPage) => {
        if (newPage < 1) {
            newPage = 1;
        }
        
        const newArray = await getItems(newPage, data);      
        setPag(newPage)
        setItems(newArray);

    }
    
    return (
        <div>
        <section>
            {(!items.length <= 0) ? (!isError) ? (items.map((item) => {
                return (<Item key={item.Id} {...item}></Item>);
            })) : <h1>Algo salio mal</h1>
                : <h1> Loading</h1>}
            </section>
            <footer>
                {(isLoading) ? <p> Page 1</p>
                    : <>
                        {(pag >= 2) ? < button onClick={() => cambiar(pag-1)} > Atras </button> : <p></p>}
                        <button onClick={() => cambiar(pag+1)}> Siguiente</button> 
                        </>
                }
            </footer>
        </div>
        );
}