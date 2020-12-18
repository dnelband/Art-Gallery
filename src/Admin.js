import React, {useState, useEffect} from 'react';
import { Link, Route, Switch } from "react-router-dom";

function Admin(props) {

    return(
        <section id="admin">
          <nav>
            <ul>
              <li><Link to="/admin/">Pictures</Link></li>
              <li><Link to="/admin/navigation">Navigation</Link></li>
              <li><Link to="/admin/messages">Messages</Link></li>
            </ul>
          </nav>
          <Switch>
          <Route exact path="/admin/"><DBTableRender fetchUrl="/pictures"/></Route>
          <Route path="/admin/navigation"><DBTableRender fetchUrl="/navigation"/></Route>
          <Route path="/admin/messages"><DBTableRender fetchUrl="/messages"/></Route>
          </Switch>
        </section>
    )
}

function DBTableRender(props) {

    const [items, setItems] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        getItems()
    },[])

    function getItems()  {
        fetch(props.fetchUrl)
        .then(res => res.text())
        .then(res =>{
          console.log(JSON.parse(res));
          const newItems = JSON.parse(res);
          let columnArray = []
          for (var i in newItems[0]){
            columnArray.push(i)
          }
          columnArray.push('update')
            console.log(columnArray)
            setColumns(columnArray)
           setItems(JSON.parse(res));
        })
    }

    const columnsDisplay = columns.map((column, index) => (
        <th scope="col">
            {column}
        </th>
    ))

    const itemsDisplay = items.map((item, index) => (
      <tr>
        {
          columns.map((column, index) => {

            let cellDisplay = item[column];
            if (column === 'update') {
                cellDisplay =(
                    <span>hello cbcdkjsjkn</span>
                )
            }
            return(
                <td>
                  {cellDisplay}
                </td>
              )
          })
        }
      </tr>
    ))

    return(
      <table className="table table-hover">
        <thead>
            <tr>
            {columnsDisplay}
            </tr>
        </thead>
        <tbody>
        {itemsDisplay}
        </tbody>
        </table>
    )
}
export default Admin;