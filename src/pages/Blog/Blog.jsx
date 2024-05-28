import React from "react";
import styles from "./Blog.module.css";

export default function Blog() {
  return (
    <>
     <div className="container">
        <div className={styles.blog}>
         <h1 className="text-left mt-5 text-uppercase">Bánh thơm ngon tại cửa hàng chúng tôi!</h1>
          <div style={{backgroundColor:'blue', height:'2px', width:'100%', marginTop:'20px'}}></div>
  
        </div>
     </div>
    </>
  );
}
