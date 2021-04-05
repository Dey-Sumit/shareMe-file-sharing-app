import axios from "axios";
import { FormEventHandler, FunctionComponent, useState } from "react";

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmail = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/api/files/email",
        data: { id, emailFrom, emailTo },
      });
      setMessage(data.message);
      setEmailFrom("");
      setEmailTo("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-4 space-y-3 ">
      <h3>You can also send the link through mail directly</h3>
      <form
        onSubmit={handleEmail}
        className="flex flex-col items-center justify-center w-full p-1 space-y-3 "
      >
        <input
          type="email"
          className="p-1 text-black border-2 border-yellow-light"
          placeholder="Email From"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          required
        />
        <input
          placeholder="Email To"
          type="email"
          className="p-1 text-black border-2 border-yellow-light"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
          required
        />
        <button
          className="w-32 p-1 focus:outline-none mx-auto my-5 font-medium tracking-wide text-white rounded-md bg-yellow-light border-yellow-light"
          type="submit"
        >
          Email
        </button>
      </form>
      {message && <p className="font-medium">{message}</p>}
    </div>
  );
};

export default EmailForm;
