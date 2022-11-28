import React from 'react'
import ItemView from '../../common/components/ItemView'
const Item = (props) => {
    return(
        <ItemView id={props.id} name={props.name} quantity={props.quantity} price={props.price} amount={props.amount} img={props.img}/>
    );
}
export default Item