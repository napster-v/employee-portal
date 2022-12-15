import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">EMS</h1>
            <p className="py-6">Use this portal to manage Employees</p>
            <Link to="/employees/">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Home;
