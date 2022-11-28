import Product from './Product';

const ListOrders = (props) => {
  const onProductUpdate = () => {
    props.onProductUpdate();
  }
  return (
    <div>
      {props.orders.map(data => {
        return <Product 
          key={data._id}
          price={data.price}
          stock={data.stock}
          image={data.image}
          id={data._id} 
          name={data.name} 
          quantities={data.quantity} 
          ingredients={data.ingredients}
          onProductUpdate={onProductUpdate}
        />
      })}
    </div>
  );
}

export default ListOrders;