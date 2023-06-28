import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setBlockchain } from "../../redux/actions/blockchain";
import { Blockchain } from "../../enums/blockchain";

export const Header = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: any) => state.blockchain);

  return (
    <div className="border-bottom p-2 d-flex justify-content-between">
      <div>
        <Link to="/" className="btn btn-primary me-4">
          Home
        </Link>
        <Link to="/tokens" className="btn btn-primary me-4">
          Tokens
        </Link>
      </div>
      <select
        value={blockchain}
        onChange={(e) => dispatch(setBlockchain(e.target.value as Blockchain))}
      >
        <option value={Blockchain.ETHEREUM}>{Blockchain.ETHEREUM}</option>
        <option value={Blockchain.ARBITRUM}>{Blockchain.ARBITRUM}</option>
      </select>
    </div>
  );
};
