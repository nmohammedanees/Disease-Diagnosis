import React from "react";
import BackgroundImage from "../assets/pexels-raul-infante-gaete-2660047-8853183.jpg";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Accurately identifying medical conditions through comprehensive
              patient history, physical examination, and diagnostic testing for
              effective treatment and management.
            </p>
            <Link className="btn btn-primary" to="/diagnose">Diagnose</Link>
          </div>
        </div>
      </div>

    </>
  );
}
