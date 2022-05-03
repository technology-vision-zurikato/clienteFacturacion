import React from "react";

export default () => {
    const eatOptions = [
        {key:0, value:'', text:'Seleccione'},
        {key:1, value:'001', text:'Sucursal 001'},
        {key:2, value:'008', text:'Sucursal 008'},

    ];

    return <select>
        {eatOptions.map(item=>{
            return <option key={item.key} value={item.value}>{item.text}</option>
        })}
    </select>
}