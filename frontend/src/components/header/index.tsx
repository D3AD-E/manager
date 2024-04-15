import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBlockchain } from "../../redux/actions/blockchain";
import { Blockchain } from "../../enums/blockchain";
import Select from "react-select";

export const Header = () => {
  const dispatch = useDispatch();

  const options = [
    { value: Blockchain.ETHEREUM, label: Blockchain.ETHEREUM },
    { value: Blockchain.ARBITRUM, label: Blockchain.ARBITRUM },
  ];

  return (
    <div className="border-bottom p-2 d-flex justify-content-between me-5">
      <div>
        <Link to="/" className="btn btn-primary me-4">
          Home
        </Link>
        <Link to="/tokens" className="btn btn-primary me-4">
          Tokens
        </Link>
      </div>
      <div>
        <Select
          options={options}
          onChange={(e) => dispatch(setBlockchain(e!.value as Blockchain))}
          defaultValue={options[0]}
        />
      </div>
    </div>
  );
};
