import React, { useState } from "react";
import axios from "axios";
import { BuyModalProps } from "./types";

export const BuyModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  currentBalance,
}: BuyModalProps) => {
  const [inputValue, setInputValue] = useState(0);

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
                <h5 className="modal-title">Buy</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="pb-3">
                  <div className="form-group">
                    <label htmlFor="inputField">Amount in ETH</label>
                    <input
                      autoComplete="off"
                      type="number"
                      className="form-control"
                      id="inputField"
                      min={0}
                      step="0.0001"
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
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.005)}
                  >
                    0.005
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.01)}
                  >
                    0.01
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.02)}
                  >
                    0.02
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.03)}
                  >
                    0.03
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.05)}
                  >
                    0.05
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(0.1)}
                  >
                    0.1
                  </button>
                  <button
                    className="btn btn-primary me-3"
                    onClick={() => setInputValue(currentBalance)}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
