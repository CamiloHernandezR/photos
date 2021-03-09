import React from 'react';

export function Item({ id, title, url}) {

    
  
    return (
        <div key={id} className="item">


            <p>   <strong>TITLE:</strong> {title} </p>
                
                  
              
              <div >
                  <img src= {url}  alt="some random image"></img>
              </div>
            
      </div>
    );
  
}
