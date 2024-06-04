import { useEffect } from "react";
import { useState } from "react";
import { alchemy } from "./alchemy";
import { cc } from "cryptocompare";
function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [ens, setEns] = useState();
  const [txns, setTxns] = useState();
  const [bal, setBal] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setGasPrice(Number(await alchemy.core.getGasPrice()));
      setTxns(await alchemy.core.getBlockWithTransactions(blockNumber));
    }

    getBlockNumber();
  });
  async function getBalance(ethns) {
    const balance = await alchemy.core.getBalance(ethns, "latest");
    setBal(balance);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 mb-4">
        <h1 className="text-2xl font-bold">Blockchain Explorer</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search for accounts, contracts, blocks, transactions"
            className="w-full p-2 border rounded"
          />
          <button className="mt-2 p-2 bg-blue-500 text-white rounded">
            Search
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Block Number</h2>
          <p>{blockNumber ? `${blockNumber}` : "Loading..."}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Gas</h2>
          <p>{gasPrice ? `${gasPrice}` : "Loading..."}</p>
        </div>
        <div className="bg-white p-4 shadow rounded flex flex-col gap-2">
          <h2 className="text-xl font-bold">Check Balance</h2>
          <input
            type="text"
            className="border hover:bg-slate-300 p-2 rounded"
            onChange={(e) => {
              setEns(e.tartget.value);
            }}
          />
          <button
            className="bg-blue-500 text-white rounded p-2"
            onClick={(e) => {
              getBalance(ens);
            }}
          >
            Search
          </button>
          <p>{bal ? "Enter ENS" : `${bal}`}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold">Transactions</h2>
          <p>{txns}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
