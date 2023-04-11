import styled from "styled-components";

// const TableRow = styled.tr`
//   color: ${(props) => (Number(props.itemID) % 2 !== 0 ? "blue" : "red")};
// `;

function ItemDisplay({items, deleteItem}) {
  const showItem = (item) => {
    return (
      <tr itemID={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.type}</td>
        <td>{item.brand}</td>
        <td><button className="btn btn-danger" onClick={() => deleteItem(item)}>Delete</button></td>
      </tr>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="heading">Items</h2>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{items.map(showItem)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemDisplay;
