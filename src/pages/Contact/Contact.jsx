import React from 'react'
import Map from './Map/Map'
import cakeStore from '../../Share/img/tiembanhngot.jpg'
import styles from './Contact.module.css'


export default function Contact() {
  return (
    <>
      <div>
        <img className={styles.cakeStore} src={cakeStore} alt='cake store'/>
        <div className='container'><Map/>
        <div className='row mb-4 '>
            <div className='col-4'>
                <h2>Hải Phòng</h2>
                <p>02 Hải châu , Quận Hải Phòng , Tp.Đà Nẵng</p>
                <p>Tel: 19001304</p>
            </div>
            <div className='col-4'>
                <h2>Nguyễn Văn Linh</h2>
                <p>91-58D Nguyễn Văn Linh , Quận Hải Châu , Tp.Đà Nẵng</p>
                <p>Tel: 19002114</p>
            </div>
            <div className='col-4'>
                <h2>Điện Biên Phủ</h2>
                <p>145 Điện Biên Phủ , Quận Hà Khê , Tp.Đà Nẵng</p>
                <p>Tel: 19001706</p>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}
