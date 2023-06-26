import React, { useState } from "react";
import axios from "axios";
import { SellModalProps } from "./types";

export const SellModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  currentBalance,
  tokenName
}: SellModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inputValue);
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sell</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="pb-3">
                  <div className="form-group">
                    <label htmlFor="inputField">Amount in {tokenName}</label>
                    <input
                      autoComplete="off"
                      type="text"
                      className="form-control"
                      id="inputField"
                      value={inputValue}
                      max={currentBalance}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </form>
                <div className="">
                  <button className="btn btn-primary me-3" onClick={()=>setInputValue(currentBalance)}>Max</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
