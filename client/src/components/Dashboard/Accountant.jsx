import React, { useState } from "react";
import defaultProfilePic from "../../images/user.png";
import { Button, Modal } from "react-bootstrap";

function Accountant() {
  const [List, setList] = useState("add");

  const [updateMenu, setUpdateMenu] = useState(false);
  const [addIngredient, setaddIngredient] = useState(false);
  const [updateIngredient, setupdateIngredient] = useState(false);
  const [addWorker, setAddWorker] = useState(false);
  const [updateSalary, setUpdateSalary] = useState(false);

  const IngredientRow = ({ IngredientName, price, quantity }) => (
    <>
      <div className="ingredient-row row my-3 ">
        <div className="ingredient-name  col-5">{IngredientName}</div>
        <div className="price col-5">{price}</div>
        <div className="quantity col-2">{quantity}</div>
      </div>
      <hr />
    </>
  );

  const IngredientData = [
    { IngredientName: "A", price: "190", quantity: "4" },
    { IngredientName: "B", price: "90", quantity: "4" },
    { IngredientName: "C", price: "50", quantity: "4" },
  ];

  const WorkerRow = ({ WorkerType, salary, number }) => (
    <>
      <div className="row my-3 ">
        <div className="col-5">{WorkerType}</div>
        <div className=" col-5">{salary}</div>
        <div className=" col-2">{number}</div>
      </div>
      <hr />
    </>
  );

  const WorkerData = [
    { WorkerType: "A", salary: "190", number: "4" },
    { WorkerType: "B", salary: "90", number: "4" },
    { WorkerType: "C", salary: "50", number: "4" },
  ];

  const openAddIngredient = () => setaddIngredient(true);
  const closeAddIngredient = () => setaddIngredient(false);

  const openUpdateIngredient = () => setupdateIngredient(true);
  const closeUpdateIngredient = () => setupdateIngredient(false);

  const openUpdateMenu = () => setUpdateMenu(true);
  const closeUpdateMenu = () => setUpdateMenu(false);

  const openAddWorker = () => setAddWorker(true);
  const closeAddWorker = () => setAddWorker(false);

  const openUpdateSalary = () => setUpdateSalary(true);
  const closeUpdateSalary = () => setUpdateSalary(false);

  const ingredientOptions = ["Option 1", "Option 2", "Option 3"];

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "auto",
    backgroundColor: "#001F3F",
    color: "white",
  };

  const heading = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    // border: "2px solid rgba(255, 255, 255, 0.3)",
    border: "1px solid yellow",
  };

  const profilePicStyle = {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const inputStyle = {
    border: "none",
    borderBottom: "2px solid #001F3F",
    backgroundColor: "transparent",
    color: "black",
    outline: "none",
    width: "100%",
    marginBottom: "10px",
    paddingTop: "5px",
  };

  return (
    <>
      <div style={pageStyle}>
        {/* <Navbar /> */}
        <div className="container mt-5" style={heading}>
          <div className="row">
            <div className="col-md-6 mt-2">
              <span style={{ fontSize: "30px" }}>Hostel Name : CV RAMAN</span>
            </div>
            <div className="col-md-5 mt-3" align="right">
              <h3>Accountant Name: ABCDEH FWW</h3>
            </div>
            <div className="col-md-1  d-flex justify-content-center align-items-center">
              <img
                src={defaultProfilePic}
                alt="Profile"
                style={profilePicStyle}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
              <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setList("add");
                }}
              >
                ADD/UPDATE
              </button>
              <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setList("ingredient");
                }}
              >
                Show All Ingredient
              </button>
              <button
                className="btn btn-primary m-1"
                onClick={() => {
                  setList("worker");
                }}
              >
                Show All Worker
              </button>
              <button className="btn btn-primary m-1" onClick={openUpdateMenu}>
                Update Mess Menu
              </button>
            </div>
          </div>
        </div>

        {/* <hr style={{ width: "87%", marginLeft: "6.4%" }} /> */}
        <hr style={{ color: "yellow", width: "86%", marginLeft: "7%" }} />

        {/* ---------------------ADD/Update ----------------------------------- */}
        {List === "add" && (
          <div className="container mt-1 mb-5 fs-4 ">
            <div className="hostel-row row my-3 ">
              <div className="hostel-name col-5">Add Ingredient and Prices</div>
              <button
                className="btn btn-primary col-2 offset-5"
                onClick={openAddIngredient}
              >
                Click Here
              </button>
            </div>
            <hr style={{ color: "yellow", width: "100.7%" }} />
            <div className="hostel-row row my-3 ">
              <div className="hostel-name col-5">
                Update Prices and Quantity
              </div>
              <button
                className="btn btn-primary col-2 offset-5"
                onClick={openUpdateIngredient}
              >
                Click Here
              </button>
            </div>
            <hr style={{ color: "yellow", width: "100.7%" }} />

            <div className="hostel-row row my-3 ">
              <div className="hostel-name col-5">
                Add Worker Type and Salary
              </div>
              <button
                className="btn btn-primary col-2 offset-5"
                onClick={openAddWorker}
              >
                Click Here
              </button>
            </div>
            <hr style={{ color: "yellow", width: "100.7%" }} />
            <div className="hostel-row row my-3 ">
              <div className="hostel-name col-5">
                Update Worker Salary or Number of Worker
              </div>
              <button
                className="btn btn-primary col-2 offset-5"
                onClick={openUpdateSalary}
              >
                Click Here
              </button>
            </div>
            <hr style={{ color: "yellow", width: "100.7%" }} />
          </div>
        )}
        {/* -------------------end-of-ADD/Update ----------------------------------- */}

        {/* -----------------list of ingredient---------- */}
        {List === "ingredient" && (
          <div className="container mt-1">
            <div className="hostel-row row my-3 ">
              <div className="hostel-name  col-5">Ingredient Name</div>
              <div className="warden-name col-5">Price</div>
              <div className="warden-name col-2">Quantity</div>
            </div>
            <hr />
            {IngredientData.map((Ingredient, index) => (
              <IngredientRow
                key={index}
                IngredientName={Ingredient.IngredientName}
                price={Ingredient.price}
                quantity={Ingredient.quantity}
              />
            ))}
          </div>
        )}
        {/* -----------------end-of-list of ingredient---------- */}
        {/* ----------------list of worker---------- */}

        {List === "worker" && (
          <div className="container mt-1 mb-5">
            <div className=" row my-3 ">
              <div className=" col-5">Worker Type</div>
              <div className=" col-5">Salary</div>
              <div className=" col-2">No. of Workes</div>
            </div>
            <hr />
            {WorkerData.map((Wroker, index) => (
              <WorkerRow
                key={index}
                WorkerType={Wroker.WorkerType}
                salary={Wroker.salary}
                number={Wroker.number}
              />
            ))}
          </div>
        )}
        {/* -----------------end-of-list of worker---------- */}

        {/* --------update mess menu---------------------- */}
        <Modal show={updateMenu} onHide={closeUpdateMenu}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title className="text-center">
                Update Mess Menu
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="">Upload image of new mess menu</label> <br />{" "}
              <br />
              <input type="file" accept="image/*" />
              {/* <input type="file" accept="image/*" onChange={(e) => setProofImage(e.target.files[0])} /> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={closeUpdateMenu}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {/*----------------end-of-update-mess-menu------------------------- */}

        {/* -------------------Add ingredient and price----------------- */}
        <Modal show={addIngredient} onHide={closeAddIngredient}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Add Ingredient and Prices</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Ingredient Name"
                style={inputStyle}
                required
              />
              <input
                type="number"
                placeholder="price"
                style={inputStyle}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={closeAddIngredient}
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* ----------------end-of Add ingredient and price---------------------------------------------- */}

        {/* ------------------Update Prices and quantity-------------------------------------------------- */}
        <Modal show={updateIngredient} onHide={closeUpdateIngredient}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Update Prices</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <select style={inputStyle} required>
                <option value="" disabled selected hidden>
                  Ingredient Name
                </option>
                {ingredientOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Price"
                style={inputStyle}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                style={inputStyle}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={closeAddIngredient}
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* ------------------add-worker------------------- */}

        <Modal show={addWorker} onHide={closeAddWorker}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>Add New Worker Type and Salary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Work Type"
                style={inputStyle}
                required
              />
              <input
                type="number"
                placeholder="salary"
                style={inputStyle}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" onClick={closeAddWorker}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* ------------------end-of-add-worker------------------- */}

        {/* --------------update worker salary and numbers----------------- */}
        <Modal show={updateSalary} onHide={closeUpdateSalary}>
          <form style={{}}>
            <Modal.Header closeButton>
              <Modal.Title>Update Worker Salary and Workers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <select style={inputStyle} required>
                <option value="" disabled selected hidden>
                  Worker Type
                </option>
                {ingredientOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Salary"
                style={inputStyle}
                required
              />
              <input
                type="number"
                placeholder="Number of Worker"
                style={inputStyle}
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={closeUpdateSalary}
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>

        {/* ------------end-of-update worker salary and numbers------------- */}
      </div>
    </>
  );
}

export default Accountant;
