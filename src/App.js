import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d)
      d = d.filter(ds => ds.UserStatus === "Active")
      console.log(d)
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table class="table container">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Sales To Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d['UserID']}>
              <th>{d['Agent first name']}</th>
              <td>{d['Agent last name']}</td>
              <td>{d['Agent email']}</td>
              <td>{d['Agent total sales to date']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;