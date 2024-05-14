import React from "react";
import styles from "../About.module.css";

export default function Map() {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5365650260073!2d108.23437638885495!3d16.037622600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142175f909008a9%3A0xc58ea2f680c55cc9!2zQ2h1bmcgY8awIE5hbSBD4bqndSBUcuG6p24gVGjhu4sgTMO9!5e0!3m2!1svi!2s!4v1715548330293!5m2!1svi!2s"
        style={{ border: "0", height: "800px", width: "800px" }}
        title="map"
        allowFullScreen=''
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

