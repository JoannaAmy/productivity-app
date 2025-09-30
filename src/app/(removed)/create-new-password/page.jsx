export default function Page ()  {
  return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Create a New Password</div>
        <div className="subtitle">Please enter your new password below.</div>
      </div>
      <form action>
        <div>
          <p>
            <span className="label">New Password</span>
          </p>
          <input
            className="input"
            type="password"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div>
          <p>
            <span className="label">Confirm Password</span>
          </p>
          <input
            className="input"
            type="password"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button className="submit" type="submit">
          Save Password and Log in
        </button>
      </form>
    </div>
  );
};
