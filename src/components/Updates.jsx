import React from "react";
import "./Updates.css";

function Updates() {
  return (
    <section className="updates-section">
      <h2>Important Updates</h2>
      <ul>
        <li>
          <a
            href="https://www.dtu.ac.in/admissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Accounts
          </a>
        </li>
        <li>
          <a
            href="https://www.dtu.ac.in/events/golden-pride-2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            Miscellaneous
          </a>
        </li>
        <li>
          <a
            href="https://www.dtu.ac.in/scholarships"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data entry
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Updates;
