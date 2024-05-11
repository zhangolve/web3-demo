// try {
//     // Estimate gas
//     const gasEstimate = await provider.estimateGas(transaction);
//     console.log("Estimated gas:", gasEstimate.toString());
// } catch (error) {
//     console.error("Error estimating gas:", error);
// }

// https://flowbite.com/docs/forms/input-field/
// https://react-hook-form.com/get-started
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import FailedModal from "./FailedModal";

const Send = () => {
  const { register, handleSubmit } = useForm();

  const [showFailedModal, setShowFailedModal] = useState(false);

  const sendMoney = async ({ recipient, value }) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const data = ethers.toUtf8Bytes("HelloWorld");
    const dataHexString = ethers.hexlify(data);

    try {
      const tx = await signer.sendTransaction({
        // 0xAA102F12737C9d1A268157231E58175383cE52b9
        to: recipient,
        value: ethers.parseEther(value),
        //   gasLimit: 21000,
        //   gasPrice: ethers.parseUnits('10', 'gwei'),vtt
        data: dataHexString,
      });
      console.log(tx);
    } catch {
      console.log("error");
      setShowFailedModal(true);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    sendMoney(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6">
          <div>
            <label
              htmlfor="sender"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sender
            </label>
            <input
              id="sender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("sender", { required: true })}
            />
          </div>
          <div>
            <label
              htmlfor="recipient"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Recipient
            </label>
            <input
              id="recipient"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("recipient", { required: true })}
            />
          </div>
          <div>
            <label
              htmlfor="value"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              value
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("value")}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
      {showFailedModal && (
        <FailedModal onClose={() => setShowFailedModal(false)} />
      )}
    </>
  );
};

export default Send;